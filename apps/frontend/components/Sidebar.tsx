"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/config";

interface Project {
  id: string;
  description: string | null;
}

export function Sidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchProjects() {
      const token = await getToken();
      try {
        const response = await axios.get(`${BACKEND_URL}/project`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    }
    fetchProjects();
  }, [getToken]);

  return (
    <aside
      // When the mouse enters this element, expand the sidebar
      onMouseEnter={() => setIsOpen(true)}
      // When the mouse leaves, collapse it
      onMouseLeave={() => setIsOpen(false)}
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r transition-all duration-300 
        ${isOpen ? "w-64" : "w-0"}`}
    >
      <div className="overflow-hidden">
        {isOpen ? (
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">My Projects</h2>
            {projects.length === 0 ? (
              <p className="text-gray-500">No projects found.</p>
            ) : (
              <ul>
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="mb-2 cursor-pointer hover:text-blue-500"
                  >
                    {project.description || "Untitled Project"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          // When collapsed, you might show a small icon or nothing at all.
          <div className="flex items-center justify-center h-full">
            
          </div>
        )}
      </div>
    </aside>
  );
}
