import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyState {
  company: {
    name: string;
    description: string;
    backgroundColor: string;
    backgroundImage: string | null;
  };
  
  updateCompanyBackground: (color: string) => void;
  updateCompanyImage: (image: string) => void;
  removeCompanyImage: () => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      company: {
        name: "Моя компания",
        description: "Управление проектами и задачами",
        backgroundColor: "#ffffff",
        backgroundImage: null,
      },

      updateCompanyBackground: (color: string) => {
        set((state) => ({
          company: {
            ...state.company,
            backgroundColor: color,
          },
        }));
      },

      updateCompanyImage: (image: string) => {
        set((state) => ({
          company: {
            ...state.company,
            backgroundImage: image,
          },
        }));
      },

      removeCompanyImage: () => {
        set((state) => ({
          company: {
            ...state.company,
            backgroundImage: null,
          },
        }));
      },
    }),
    {
      name: "company-storage",
    }
  )
);


