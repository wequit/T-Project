import { AnimatePresence } from "framer-motion";
import { TaskItem } from "./TaskItem";
import type { Task } from "@/shared/types";

type TaskListSectionProps = {
  list: {
    id: string;
    title: string;
  };
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onRemove: (id: string) => void;
  color?: "blue" | "green";
};

export const TaskListSection = ({
  list,
  tasks,
  onToggle,
  onEdit,
  onRemove,
  color = "blue",
}: TaskListSectionProps) => {
  return (
    <section className="bg-white p-6 rounded-3xl shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 bg-${color}-500 rounded-full`}></span>
        {list.title} <span className="text-gray-400 font-normal">{tasks.length}</span>
      </h2>
      <AnimatePresence>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                completed={list.id === "completed"}
                onToggle={() => onToggle(task.id)}
                onEdit={() => onEdit(task.id, task.title)}
                onRemove={() => onRemove(task.id)}
              />
            ))}
          </ul>
        ) : (
          <p className="py-4 text-center text-gray-400 text-sm">
            Нет задач в этом списке
          </p>
        )}
      </AnimatePresence>
    </section>
  );
};


