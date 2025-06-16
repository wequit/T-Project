import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { List, Plus, X } from "lucide-react";

type ListsSidebarProps = {
  lists: Array<{ id: string; title: string }>;
  selectedListId: string | null;
  newListTitle: string;
  setSelectedListId: (id: string) => void;
  setNewListTitle: (title: string) => void;
  addList: () => void;
  removeList: (id: string) => void;
};

export const ListsSidebar = ({
  lists,
  selectedListId,
  newListTitle,
  setSelectedListId,
  setNewListTitle,
  addList,
  removeList,
}: ListsSidebarProps) => {
  const [isCreatingList, setIsCreatingList] = useState(false);

  const handleAddList = useCallback(() => {
    const trimmed = newListTitle?.trim();
    if (trimmed) {
      addList();
      setIsCreatingList(false);
      setNewListTitle("");
    }
  }, [newListTitle, addList, setNewListTitle]);

  return (
    <aside className="w-72 bg-white p-5 rounded-3xl shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold flex items-center gap-2 text-gray-700">
          <List size={18} className="text-blue-500" />
          Мой список
        </h2>
      </div>

      <ul className="space-y-1.5 mb-5">
        {lists.map((list) => (
          <li key={list.id}>
            <button
              onClick={() => setSelectedListId(list.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl flex justify-between items-center text-sm transition-all ${
                selectedListId === list.id
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-2 truncate">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedListId === list.id ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
                {list.title}
              </span>
              {list.id !== "important" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeList(list.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                  aria-label={`Удалить список ${list.title}`}
                >
                  <X size={16} />
                </button>
              )}
            </button>
          </li>
        ))}
      </ul>

      {isCreatingList ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-2"
        >
          <input
            type="text"
            placeholder="Название списка"
            value={newListTitle || ""}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddList()}
            autoFocus
            className="flex-1 px-4 py-2 bg-gray-50 rounded-xl text-sm placeholder-gray-400"
          />
          <div className="flex gap-1.5">
            <button
              onClick={handleAddList}
              className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              aria-label="Добавить список"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => setIsCreatingList(false)}
              className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200"
              aria-label="Отменить"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      ) : (
        <button
          onClick={() => setIsCreatingList(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-blue-500 hover:bg-blue-50 rounded-xl border border-dashed border-blue-200"
        >
          <Plus size={16} /> Создать список
        </button>
      )}
    </aside>
  );
};