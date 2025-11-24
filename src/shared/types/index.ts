// Базовые типы задач
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

// Типы проектов
export type ProjectTask = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Column = {
  id: string;
  name: string;
  tasks: ProjectTask[];
  createdAt: string;
  updatedAt: string;
};

export type Board = {
  id: string;
  name: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
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

// Типы компании
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

// UI типы
export type BoardAction = 
  | { type: "SET_RENAME_ID"; payload: string | null }
  | { type: "SET_RENAME_VALUE"; payload: string }
  | { type: "TOGGLE_MENU"; payload: string | null }
  | { type: "SET_NEW_NAME"; payload: string };

export interface BoardUI {
  renamingBoardId: string | null;
  renamingBoardValue: string;
  openBoardMenuId: string | null;
  newBoardName: string;
}


