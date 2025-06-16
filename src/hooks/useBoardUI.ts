import { useReducer } from "react";

interface BoardUIState {
  newBoardName: string;
  renamingBoardId: string | null;
  renamingBoardValue: string;
  openBoardMenuId: string | null;
}

type BoardUIAction =
  | { type: "SET_NEW_NAME"; payload: string }
  | { type: "SET_RENAME_ID"; payload: string | null }
  | { type: "SET_RENAME_VALUE"; payload: string }
  | { type: "TOGGLE_MENU"; payload: string | null }
  | { type: "RESET" };

const initialState: BoardUIState = {
  newBoardName: "",
  renamingBoardId: null,
  renamingBoardValue: "",
  openBoardMenuId: null,
};

function reducer(state: BoardUIState, action: BoardUIAction): BoardUIState {
  switch (action.type) {
    case "SET_NEW_NAME":
      return { ...state, newBoardName: action.payload };
    case "SET_RENAME_ID":
      return { ...state, renamingBoardId: action.payload };
    case "SET_RENAME_VALUE":
      return { ...state, renamingBoardValue: action.payload };
    case "TOGGLE_MENU":
      return { ...state, openBoardMenuId: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useBoardUI() {
  return useReducer(reducer, initialState);
}
