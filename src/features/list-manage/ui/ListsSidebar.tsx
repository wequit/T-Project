import { useState, useCallback } from "react";
import { List, Plus, X } from "lucide-react";

type ListsSidebarProps = {
  lists: Array<{ id: number; title: string }>;
  selectedListId: number | null;
  setSelectedListId: (id: number) => void;
  onAddList: (title: string) => void;
  onRemoveList: (id: number) => void;
};

export const ListsSidebar = ({
  lists,
  selectedListId,
  setSelectedListId,
  onAddList,
  onRemoveList,
}: ListsSidebarProps) => {
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const handleAddList = useCallback(() => {
    const trimmed = newListTitle?.trim();
    if (trimmed) {
      onAddList(trimmed);
      setIsCreatingList(false);
      setNewListTitle("");
    }
  }, [newListTitle, onAddList]);

  return (
    <aside className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900">
          <List size={20} className="text-blue-500" />
          Список
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {lists.length}
        </span>
      </div>

      <ul className="space-y-2 mb-4 flex-1 overflow-y-auto">
        {lists.map((list) => {
          const isSelected = selectedListId === list.id;
          return (
            <li key={list.id}>
              <div
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer group ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-500 shadow-sm"
                    : "hover:bg-gray-50 border border-transparent hover:border-gray-200"
                }`}
                onClick={() => setSelectedListId(list.id)}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    isSelected
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {list.title[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium truncate ${
                      isSelected ? "text-blue-900" : "text-gray-900"
                    }`}
                  >
                    {list.title}
                  </p>
                </div>
                {true && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveList(list.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Удалить список ${list.title}`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {isCreatingList ? (
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Название списка"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddList();
              if (e.key === "Escape") setIsCreatingList(false);
            }}
            autoFocus
            className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-sm placeholder-gray-400 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-1.5">
            <button
              onClick={handleAddList}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              aria-label="Добавить список"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => setIsCreatingList(false)}
              className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200"
              aria-label="Отменить"
            >
              <X size={16} />
            </button>
          </div>
        </div>
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


