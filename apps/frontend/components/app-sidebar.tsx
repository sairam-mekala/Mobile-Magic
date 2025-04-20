'use client';

import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar"

import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import Link from "next/link"

type Project = {
  id: string;
  description: string;
  createdAt: string;
}

function useProjects() {
  const { getToken } = useAuth();
  const [projects, setProjects] = useState<{ [date: string]: Project[] }>({});

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) return;
      const response = await axios.get(`${BACKEND_URL}/projects`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const grouped = response.data.projects.reduce((acc: { [date: string]: Project[] }, p: Project) => {
        const date = new Date(p.createdAt)
          .toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        (acc[date] ||= []).push(p);
        return acc;
      }, {});
      setProjects(grouped);
    })();
  }, [getToken]);

  return projects;
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [search, setSearch] = useState("");
  const projects = useProjects();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex space-between border-2 bg-gray-500/10 focus-within:outline-1 focus-within:outline-teal-300/30 rounded-md pr-2 pl-1">
              <Input
                className="w-full p-1 placeholder:text-gray-400 focus-visible:ring-0 text-sm border-none outline-none"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <SearchIcon className="w-5 h-5 ml-2 text-gray-400" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.keys(projects).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar text-teal-400">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <p className="mt-2 font-semibold text-center text-teal-400">
                    No projects found
                  </p>
                </div>
              ) : (
                Object.entries(projects)
                  .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                  .map(([date, list], idx) => (
                    <SidebarMenuItem key={idx}>
                      <SidebarGroupLabel>{date}</SidebarGroupLabel>
                      {list
                        .filter(p => p.description.toLowerCase().includes(search.toLowerCase()))
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map(proj => (
                          <SidebarMenuButton
                            asChild
                            key={proj.id}
                            className="my-1 rounded-md overflow-hidden"
                          >
                            <Link
                              href={`/project/${proj.id}`}
                              className="block w-full truncate min-w-0 px-2 py-1"
                              title={proj.description}
                            >
                              {proj.description}
                            </Link>
                          </SidebarMenuButton>
                        ))}
                      <SidebarSeparator />
                    </SidebarMenuItem>
                  ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
