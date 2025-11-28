import { useMemo } from "react";
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { TaskItem } from "./TaskItem";
import type { TaskDTO } from "../model/types";

type TasksListProps = {
  tasks: TaskDTO[];
  onToggleTask: (taskId: number) => void;
  onEditTask: (taskId: number, title: string) => void;
  onRemoveTask: (taskId: number) => void;
  showCompleted?: boolean;
  onToggleShowCompleted?: (show: boolean) => void;
  emptyMessage?: string;
};

export const TasksList = ({
  tasks,
  onToggleTask,
  onEditTask,
  onRemoveTask,
  showCompleted = true,
  onToggleShowCompleted,
  emptyMessage = "Нет задач в этом списке",
}: TasksListProps) => {
  const activeTasks = useMemo(() => tasks.filter((t) => !t.done), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((t) => t.done), [tasks]);
  const completedCount = completedTasks.length;

  const handlePromptEdit = (taskId: number, currentTitle: string) => {
    const newTitle = prompt("Редактировать задачу", currentTitle);
    if (newTitle?.trim()) onEditTask(taskId, newTitle);
  };

  return (
    <div className="flex-1 space-y-3 overflow-y-auto">
      {activeTasks.length > 0 && (
        <div className="space-y-2">
          {activeTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              completed={task.done}
              onToggle={() => onToggleTask(task.id)}
              onEdit={() => handlePromptEdit(task.id, task.title)}
              onRemove={() => onRemoveTask(task.id)}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && onToggleShowCompleted && (
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => onToggleShowCompleted(!showCompleted)}
            className="flex items-center justify-between w-full mb-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-500" />
              <h4 className="text-sm font-semibold text-gray-700">
                Выполненные задачи ({completedCount})
              </h4>
            </div>
            {showCompleted ? (
              <ChevronUp size={18} className="text-gray-400 group-hover:text-gray-600" />
            ) : (
              <ChevronDown size={18} className="text-gray-400 group-hover:text-gray-600" />
            )}
          </button>
          {showCompleted && (
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  completed={task.done}
                  onToggle={() => onToggleTask(task.id)}
                  onEdit={() => handlePromptEdit(task.id, task.title)}
                  onRemove={() => onRemoveTask(task.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <Circle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
          <p className="text-gray-400 text-xs mt-1">Добавьте первую задачу</p>
        </div>
      )}
    </div>
  );
};

