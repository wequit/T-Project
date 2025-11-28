import { useState } from "react";
import { Plus, X } from "lucide-react";

type AddTaskListSectionProps = {
  onAdd: (title: string) => void;
};

export const AddTaskListSection = ({ onAdd }: AddTaskListSectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <div className="w-80 flex-shrink-0 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
            if (e.key === "Escape") setIsAdding(false);
          }}
          placeholder="Название списка..."
          autoFocus
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            Добавить список
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="w-80 flex-shrink-0 h-12 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-300 transition-colors"
    >
      <Plus size={18} />
      Добавить список
    </button>
  );
};

