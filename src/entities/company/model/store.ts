import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Company, Project } from "@/shared/types";

export interface CompanyState {
  company: Company;
  updateCompanyBackground: (color: string) => void;
  updateCompanyImage: (image: string) => void;
  removeCompanyImage: () => void;
  createProject: (name: string, description: string, color: string) => void;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
}

const initialCompany: Company = {
  id: "1",
  name: "Моя компания",
  description: "Описание компании",
  backgroundColor: "#ffffff",
  projects: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      company: initialCompany,

      updateCompanyBackground: (color) =>
        set((state) => ({
          company: {
            ...state.company,
            backgroundColor: color,
            updatedAt: new Date().toISOString(),
          },
        })),

      updateCompanyImage: (image) =>
        set((state) => ({
          company: {
            ...state.company,
            backgroundImage: image,
            updatedAt: new Date().toISOString(),
          },
        })),

      removeCompanyImage: () =>
        set((state) => ({
          company: {
            ...state.company,
            backgroundImage: undefined,
            updatedAt: new Date().toISOString(),
          },
        })),

      createProject: (name, description, color) => {
        if (!name.trim()) return;

        const newProject: Project = {
          id: Date.now().toString(),
          name,
          description,
          color,
          members: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          company: {
            ...state.company,
            projects: [...state.company.projects, newProject],
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      removeProject: (projectId) =>
        set((state) => ({
          company: {
            ...state.company,
            projects: state.company.projects.filter((p) => p.id !== projectId),
            updatedAt: new Date().toISOString(),
          },
        })),

      updateProject: (projectId, updates) =>
        set((state) => ({
          company: {
            ...state.company,
            projects: state.company.projects.map((project) =>
              project.id === projectId
                ? {
                    ...project,
                    ...updates,
                    updatedAt: new Date().toISOString(),
                  }
                : project
            ),
            updatedAt: new Date().toISOString(),
          },
        })),
    }),
    {
      name: "company-storage",
      partialize: (state) => ({ company: state.company }),
    }
  )
);

