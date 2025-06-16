export interface CompanyState {
  company: Company;
  isCreatingProject: boolean;
  newProjectName: string;
  newProjectDescription: string;
  selectedColor: string;
  setNewProjectName: (name: string) => void;
  setNewProjectDescription: (description: string) => void;
  setSelectedColor: (color: string) => void;
  setIsCreatingProject: (isCreating: boolean) => void;
  updateCompanyBackground: (color: string) => void;
  updateCompanyImage: (image: string) => void;
  removeCompanyImage: () => void;
  createProject: () => void;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
} 

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  listId: string;
};

export type List = {
  id: string;
  title: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  color: string;
  members: number;
  createdAt: string;
  updatedAt: string;
  boards?: Board[];
};

export type Company = {
  id: string;
  name: string;
  description: string;
  backgroundImage?: string;
  backgroundColor: string;
  projects: Project[];
  createdAt: string;
  updatedAt: string;
};

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  name: string;
  tasks: ProjectTask[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStore {
  project: Project | null;
  selectedBoardId: string | null;
  setSelectedBoardId: (id: string) => void;
  addBoard: (name: string) => void;
  renameBoard: (id: string, name: string) => void;
  removeBoard: (id: string) => void;
  addColumn: (boardId: string, name: string) => void;
  renameColumn: (boardId: string, columnId: string, name: string) => void;
  removeColumn: (boardId: string, columnId: string) => void;
  addTask: (boardId: string, columnId: string, title: string) => void;
  removeTask: (boardId: string, columnId: string, taskId: string) => void;
  toggleTask: (boardId: string, columnId: string, taskId: string) => void;
  renameTask: (boardId: string, columnId: string, taskId: string, title: string) => void;
  updateProject: (updates: Partial<Project>) => void;
}

export interface BoardUI {
  renamingBoardId: string | null;
  renamingBoardValue: string;
  openBoardMenuId: string | null;
  newBoardName: string;
}

export type BoardAction = 
  | { type: "SET_RENAME_ID"; payload: string | null }
  | { type: "SET_RENAME_VALUE"; payload: string }
  | { type: "TOGGLE_MENU"; payload: string | null }
  | { type: "SET_NEW_NAME"; payload: string }; 