import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Ellipsis, Edit2, Trash2 } from "lucide-react";
import type { BoardUI, BoardAction } from "../../../lib/types";

interface ProjectBoardTabsProps {
  boards: { id: string; name: string }[];
  selectedBoardId: string | undefined;
  setSelectedBoardId: (id: string) => void;
  boardUI: BoardUI;
  boardDispatch: (action: BoardAction) => void;
  addBoard: (name: string) => void;
  renameBoard: (id: string, name: string) => void;
  removeBoard: (id: string) => void;
}

export const ProjectBoardTabs: FC<ProjectBoardTabsProps> = ({
  boards,
  selectedBoardId, 
  setSelectedBoardId,
  boardUI,
  boardDispatch,
  addBoard,
  renameBoard,
  removeBoard,
}) => {
  return (
    <div className="flex items-center gap-3 mb-6 pb-2 overflow-x-auto scrollbar-hide">
      <AnimatePresence initial={false}>
        {boards.map((board) => (
          <motion.div
            key={board.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative"
          >
            {boardUI.renamingBoardId === board.id ? (
              <input
                value={boardUI.renamingBoardValue}
                onChange={(e) => boardDispatch({ type: "SET_RENAME_VALUE", payload: e.target.value })}
                onBlur={() => {
                  renameBoard(board.id, boardUI.renamingBoardValue);
                  boardDispatch({ type: "SET_RENAME_ID", payload: null });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    renameBoard(board.id, boardUI.renamingBoardValue);
                    boardDispatch({ type: "SET_RENAME_ID", payload: null });
                  }
                }}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-1">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedBoardId === board.id
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedBoardId(board.id)}
                >
                  {board.name}
                </button>

                <div className="relative">
                  <button
                    onClick={() =>
                      boardDispatch({
                        type: "TOGGLE_MENU",
                        payload:
                          boardUI.openBoardMenuId === board.id ? null : board.id,
                      })
                    }
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    <Ellipsis className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {boardUI.openBoardMenuId === board.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => {
                              boardDispatch({ type: "SET_RENAME_ID", payload: board.id });
                              boardDispatch({ type: "SET_RENAME_VALUE", payload: board.name });
                              boardDispatch({ type: "TOGGLE_MENU", payload: null });
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Rename
                          </button>
                          {boards.length > 1 && (
                            <button
                              onClick={() => {
                                removeBoard(board.id);
                                boardDispatch({ type: "TOGGLE_MENU", payload: null });
                              }}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex items-center gap-2 pl-2">
        <input
          value={boardUI.newBoardName}
          onChange={(e) => boardDispatch({ type: "SET_NEW_NAME", payload: e.target.value })}
          placeholder="Новая доска"
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          onKeyDown={(e) => {
            if (e.key === "Enter" && boardUI.newBoardName.trim()) {
              addBoard(boardUI.newBoardName);
              boardDispatch({ type: "SET_NEW_NAME", payload: "" });
            }
          }}
        />
        <button
          onClick={() => {
            if (boardUI.newBoardName.trim()) {
              addBoard(boardUI.newBoardName);
              boardDispatch({ type: "SET_NEW_NAME", payload: "" });
            }
          }}
          className="p-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          disabled={!boardUI.newBoardName.trim()}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
