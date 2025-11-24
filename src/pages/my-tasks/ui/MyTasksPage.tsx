import { useTaskStore } from "@/entities/task";
import { ListsSidebar } from "@/features/list-manage";
import { TasksContent } from "@/widgets/task-list";

export const MyTasksPage = () => {
  const {
    tasks,
    lists,
    selectedListId,
    setSelectedListId,
    addTask,
    toggleTask,
    clearAllTasks,
    removeTask,
    editTask,
    addList,
    removeList,
  } = useTaskStore();

  const handleAddTask = (title: string) => {
    if (selectedListId) {
      addTask(title, selectedListId);
    }
  };

  if (lists.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Нет списков задач</h1>
          <button
            onClick={() => addList("Важные задачи")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Создать первый список
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Мои задачи</h1>

      <div className="flex gap-6 flex-col lg:flex-row">
        <ListsSidebar
          lists={lists}
          selectedListId={selectedListId}
          setSelectedListId={setSelectedListId}
          onAddList={addList}
          onRemoveList={removeList}
        />

        <TasksContent
          tasks={tasks}
          lists={lists}
          selectedListId={selectedListId}
          addTask={handleAddTask}
          toggleTask={toggleTask}
          clearAllTasks={clearAllTasks}
          removeTask={removeTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
};

