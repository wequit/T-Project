import { Check, Edit, Trash2 } from "lucide-react";
import type { TaskDTO } from "../model/types";

type TaskItemProps = {
  task: TaskDTO;
  onToggle: () => void;
  onEdit: () => void;
  onRemove: () => void;
  completed?: boolean;
};

export const TaskItem = ({
  task,
  onToggle,
  onEdit,
  onRemove,
  completed = false,
}: TaskItemProps) => (
  <li
    className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg group ${
      completed ? "" : "hover:bg-gray-100"
    } transition-colors`}
  >
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
          completed
            ? "bg-green-500 border-green-500"
            : "border-gray-300 group-hover:border-blue-300"
        }`}
      >
        {completed && <Check size={12} className="text-white" strokeWidth={3} />}
      </button>
      <span
        className={`text-sm truncate ${
          completed ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {task.title}
      </span>
    </div>
    <div className="flex gap-1.5">
      <button
        onClick={onEdit}
        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Edit size={16} strokeWidth={2} />
      </button>
      <button
        onClick={onRemove}
        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={16} strokeWidth={2} />
      </button>
    </div>
  </li>
);

