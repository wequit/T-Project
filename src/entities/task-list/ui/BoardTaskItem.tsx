import { Check, Edit, Trash2 } from "lucide-react";
import type { TaskDTO } from "../model/types";

type BoardTaskItemProps = {
  task: TaskDTO;
  onToggle: () => void;
  onEdit: () => void;
  onRemove: () => void;
};

export const BoardTaskItem = ({
  task,
  onToggle,
  onEdit,
  onRemove,
}: BoardTaskItemProps) => (
  <li className="flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-2.5 flex-1 min-w-0">
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
          task.done
            ? "bg-green-500 border-green-500"
            : "border-gray-300 group-hover:border-blue-400"
        }`}
      >
        {task.done && <Check size={10} className="text-white" strokeWidth={3} />}
      </button>
      <span
        className={`text-sm truncate ${
          task.done ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {task.title}
      </span>
    </div>
    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={onEdit}
        className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
      >
        <Edit size={14} />
      </button>
      <button
        onClick={onRemove}
        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
      >
        <Trash2 size={14} />
      </button>
    </div>
  </li>
);

