import type { FC } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { MoreVertical, Trash2 } from "lucide-react";

interface Column {
  id: string;
  name: string;
  tasks: { id: string; title: string; completed: boolean }[];
}

interface ColumnCardProps {
  column: Column;
  renameColumn: (columnId: string, name: string) => void;
  removeColumn: (columnId: string) => void;
  toggleTask: (columnId: string, taskId: string) => void;
  removeTask: (columnId: string, taskId: string) => void;
  addTask: (columnId: string, title: string) => void;
}

export const ColumnCard: FC<ColumnCardProps> = ({
  column,
  renameColumn,
  removeColumn,
  toggleTask,
  removeTask,
  addTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [columnName, setColumnName] = useState(column.name);
  const [openMenu, setOpenMenu] = useState(false);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    addTask(column.id, newTaskTitle.trim());
    setNewTaskTitle("");
  };

  const handleRename = () => {
    renameColumn(column.id, columnName);
    setIsRenaming(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-xl p-3 w-72 shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-center mb-3">
        {isRenaming ? (
          <input
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename();
            }}
            autoFocus
            className="text-sm font-semibold w-full px-2 py-1 border border-gray-200 rounded"
          />
        ) : (
          <h3
            className="text-sm font-semibold text-gray-800 cursor-pointer"
            onClick={() => setIsRenaming(true)}
          >
            {column.name}
          </h3>
        )}

        <div className="relative">
          <button
            className="p-1 text-gray-400 hover:text-gray-600"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
              <button
                onClick={() => removeColumn(column.id)}
                className="w-full text-left text-sm text-red-600 px-3 py-2 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 inline mr-1" /> Удалить
              </button>
            </div>
          )}
        </div>
      </div>

      <ul className="space-y-2 mb-3">
        {column.tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md text-sm"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(column.id, task.id)}
              />
              <span
                className={task.completed ? "line-through text-gray-400" : "text-gray-800"}
              >
                {task.title}
              </span>
            </label>
            <button
              onClick={() => removeTask(column.id, task.id)}
              className="text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
          placeholder="Добавить задание"
          className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded"
        />
        <button
          onClick={handleAddTask}
          className="text-sm px-2 py-1 bg-gray-900 text-white rounded hover:bg-gray-800"
        >
          Add
        </button>
      </div>
    </motion.div>
  );
};


