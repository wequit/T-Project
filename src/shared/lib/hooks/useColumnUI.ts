import { useReducer } from "react";

interface ColumnUIState {
  newColumnName: string;
  isAdding: boolean;
}

type ColumnUIAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "START_ADD" }
  | { type: "CANCEL_ADD" };

const initialState: ColumnUIState = {
  newColumnName: "",
  isAdding: false,
};

function reducer(state: ColumnUIState, action: ColumnUIAction): ColumnUIState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, newColumnName: action.payload };
    case "START_ADD":
      return { ...state, isAdding: true };
    case "CANCEL_ADD":
      return { ...state, newColumnName: "", isAdding: false };
    default:
      return state;
  }
}

export function useColumnUI() {
  return useReducer(reducer, initialState);
}


