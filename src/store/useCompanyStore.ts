import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Company, Project, CompanyState } from "../lib/types";
// import { useProjectStore } from "../store/useProjectStore";

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
    (set, get) => ({
      company: initialCompany,
      isCreatingProject: false,
      newProjectName: "",
      newProjectDescription: "",
      selectedColor: "#3b82f6",

      setNewProjectName: (name) => set({ newProjectName: name }),
      setNewProjectDescription: (description) => set({ newProjectDescription: description }),
      setSelectedColor: (color) => set({ selectedColor: color }),
      setIsCreatingProject: (isCreating) => set({ isCreatingProject: isCreating }),

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
        
      createProject: () => {
        const { newProjectName, newProjectDescription, selectedColor } = get();
        
        if (!newProjectName.trim()) return;
 
        const newProject: Project = {
          id: Date.now().toString(),
          name: newProjectName,
          description: newProjectDescription,
          color: selectedColor,
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
          newProjectName: "",
          newProjectDescription: "",
          isCreatingProject: false,
        }));
        // useProjectStore(newProject.id);
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