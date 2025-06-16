import { useTaskStore } from "../store/useTaskStore";
import { ListsSidebar } from "../components/_myTasks/ListSidebar/ListsSidebar";
import { TasksMainContent } from "../components/_myTasks/Tasks/TasksMainContent";

export const MyTasksPage = () => {
  const {
    tasks,
    lists,
    newTaskTitle,
    newListTitle = "",
    selectedListId,
    setNewTaskTitle,
    setNewListTitle,
    setSelectedListId,
    addTask,
    toggleTask,
    clearAllTasks,
    removeTask,
    editTask,
    addList,
    removeList,
  } = useTaskStore();

    if (lists.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Нет списков задач</h1>
          {/* Это временная кнопка, при реальном использовании нужно будет создать список */}
          <button
            onClick={() => {}}
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
          newListTitle={newListTitle}
          setSelectedListId={setSelectedListId}
          setNewListTitle={(title) => setNewListTitle(title)}
          addList={addList}
          removeList={removeList}
        />

        <TasksMainContent
          tasks={tasks}
          lists={lists}
          newTaskTitle={newTaskTitle}
          selectedListId={selectedListId}
          setNewTaskTitle={setNewTaskTitle}
          addTask={addTask}
          toggleTask={toggleTask}
          clearAllTasks={clearAllTasks}
          removeTask={removeTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
};