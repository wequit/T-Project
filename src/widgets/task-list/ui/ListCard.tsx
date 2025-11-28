import { useState } from "react";
import { Plus, MoreVertical, Trash2 } from "lucide-react";
import { TaskInputForm } from "@/features/task-create";
import { TasksList, type TaskDTO } from "@/entities/task-list";

type ListCardProps = {
  list: { id: number; title: string };
  tasks: TaskDTO[];
  onAddTask: (title: string) => void;
  onToggleTask: (taskId: number) => void;
  onRemoveTask: (taskId: number) => void;
  onEditTask: (taskId: number, title: string) => void;
  onRemoveList: () => void;
};

export const ListCard = ({
  list,
  tasks,
  onAddTask,
  onToggleTask,
  onRemoveTask,
  onEditTask,
  onRemoveList,
}: ListCardProps) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  const activeTasksCount = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.filter((t) => t.done).length;

  const handleAddTask = (title: string) => {
    if (title.trim()) {
      onAddTask(title);
      setIsAddingTask(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Заголовок списка */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            {list.title[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{list.title}</h2>
            <p className="text-sm text-gray-500">
              {activeTasksCount} активных, {completedCount} выполнено
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical size={20} />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onRemoveList();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={16} />
                Удалить список
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Добавление задачи */}
      <div className="mb-6">
        {isAddingTask ? (
          <TaskInputForm
            onSubmit={handleAddTask}
            onCancel={() => setIsAddingTask(false)}
          />
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl border border-dashed border-blue-300 transition-colors"
          >
            <Plus size={18} />
            Добавить задачу
          </button>
        )}
      </div>

      {/* Список задач */}
      <TasksList
        tasks={tasks}
        onToggleTask={onToggleTask}
        onEditTask={onEditTask}
        onRemoveTask={onRemoveTask}
        showCompleted={showCompleted}
        onToggleShowCompleted={setShowCompleted}
      />
    </div>
  );
};

