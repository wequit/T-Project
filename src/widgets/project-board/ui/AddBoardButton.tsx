import { useState } from "react";
import { Plus, X } from "lucide-react";

type AddBoardButtonProps = {
  onAdd: (title: string) => void;
};

export const AddBoardButton = ({ onAdd }: AddBoardButtonProps) => {
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
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
            if (e.key === "Escape") setIsAdding(false);
          }}
          placeholder="Название доски..."
          autoFocus
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Создать
        </button>
        <button
          onClick={() => setIsAdding(false)}
          className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
    >
      <Plus size={16} />
      Новая доска
    </button>
  );
};


