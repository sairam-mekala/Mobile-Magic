import cors from "cors";
import express from "express";
import { prismaClient } from "db/client";
import { systemPrompt } from "./systemPrompt";
import { ArtifactProcessor } from "./parser";
import { onFileUpdate, onShellCommand } from "./os";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("YOUR_API_KEY"); 

app.post("/prompt", async (req, res) => {
  const { prompt, projectId } = req.body;

  await prismaClient.prompt.create({
    data: {
      content: prompt,
      projectId,
      type: "USER",
    },
  });

  const allPrompts = await prismaClient.prompt.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const contents = allPrompts.map((p: any) => ({
    role: p.type === "USER" ? "user" : "model",
    parts: [{ text: p.content }],
  }));

  // Insert system prompt at the start
  contents.unshift({
    role: "user",
    parts: [{ text: systemPrompt }],
  });

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContentStream({ contents });

  let artifact = "";
  let artifactProcessor = new ArtifactProcessor(
    "",
    (filePath, fileContent) => onFileUpdate(filePath, fileContent, projectId),
    (shellCommand) => onShellCommand(shellCommand, projectId)
  );

  try {
    for await (const chunk of result.stream) {
      const text = chunk.text();
      artifact += text;
      artifactProcessor.append(text);
      artifactProcessor.parse();
    }

    await prismaClient.prompt.create({
      data: {
        content: artifact,
        projectId,
        type: "SYSTEM",
      },
    });

    await prismaClient.action.create({
      data: {
        content: "Done!",
        projectId,
      },
    });

    res.json({ response: artifact });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Error processing prompt." });
  }
});

app.listen(9091, () => {
  console.log("Server is running on port 9091");
});
