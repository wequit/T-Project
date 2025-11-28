import { useState } from "react";
import { Plus, MoreVertical, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { BoardTaskItem, type TaskDTO } from "@/entities/task-list";

type TaskList = {
  id: number;
  title: string;
  tasks?: TaskDTO[] | null;
};

type TaskListColumnProps = {
  taskList: TaskList;
  onAddTask: (title: string) => void;
  onToggleTask: (taskId: number) => void;
  onEditTask: (taskId: number, newTitle: string, originalTask: TaskDTO) => void;
  onRemoveTask: (taskId: number) => void;
  onRemoveList: () => void;
  onRenameList: (title: string) => void;
};

export const TaskListColumn = ({
  taskList,
  onAddTask,
  onToggleTask,
  onEditTask,
  onRemoveTask,
  onRemoveList,
  onRenameList,
}: TaskListColumnProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [listName, setListName] = useState(taskList.title);
  const [showMenu, setShowMenu] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const tasks = taskList.tasks ?? [];
  const activeTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim());
    setNewTaskTitle("");
    setIsAddingTask(false);
  };

  const handleRename = () => {
    if (listName.trim()) {
      onRenameList(listName.trim());
    }
    setIsRenaming(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-xl w-80 flex-shrink-0 shadow-sm border border-gray-200 flex flex-col max-h-[calc(100vh-200px)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {taskList.title[0].toUpperCase()}
          </div>
          {isRenaming ? (
            <input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
                if (e.key === "Escape") setIsRenaming(false);
              }}
              autoFocus
              className="flex-1 text-sm font-semibold px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="flex-1 min-w-0">
              <h3
                className="text-sm font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600"
                onClick={() => setIsRenaming(true)}
              >
                {taskList.title}
              </h3>
              <p className="text-xs text-gray-500">
                {activeTasks.length} активных
              </p>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical size={16} />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onRemoveList();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={14} />
                Удалить
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tasks */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTasks.map((task) => (
          <BoardTaskItem
            key={task.id}
            task={task}
            onToggle={() => onToggleTask(task.id)}
            onEdit={() => {
              const newTitle = prompt("Редактировать задачу", task.title);
              if (newTitle?.trim()) {
                onEditTask(task.id, newTitle.trim(), task);
              }
            }}
            onRemove={() => onRemoveTask(task.id)}
          />
        ))}

        {completedTasks.length > 0 && (
          <div className="pt-2 mt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2 px-1">
              Выполнено ({completedTasks.length})
            </p>
            {completedTasks.map((task) => (
              <BoardTaskItem
                key={task.id}
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onEdit={() => {
                  const newTitle = prompt("Редактировать задачу", task.title);
                  if (newTitle?.trim()) {
                    onEditTask(task.id, newTitle.trim(), task);
                  }
                }}
                onRemove={() => onRemoveTask(task.id)}
              />
            ))}
          </div>
        )}

        {tasks.length === 0 && !isAddingTask && (
          <div className="text-center py-6">
            <p className="text-sm text-gray-400">Нет задач</p>
          </div>
        )}
      </div>

      {/* Add Task */}
      <div className="p-3 border-t border-gray-100">
        {isAddingTask ? (
          <div className="space-y-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask();
                if (e.key === "Escape") setIsAddingTask(false);
              }}
              placeholder="Название задачи..."
              autoFocus
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddTask}
                className="flex-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
              >
                Добавить
              </button>
              <button
                onClick={() => setIsAddingTask(false)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-dashed border-gray-300 hover:border-blue-300 transition-colors"
          >
            <Plus size={16} />
            Добавить задачу
          </button>
        )}
      </div>
    </motion.div>
  );
};

