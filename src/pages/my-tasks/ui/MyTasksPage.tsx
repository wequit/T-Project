import { useState, useMemo } from "react";
import {
  useTaskListList,
  useCreateTaskList,
  useDeleteTaskList,
  useCreateTask,
  useDeleteTask,
  useToggleTask,
  useUpdateTask,
} from "@/entities/task-list";
import { ListsSidebar } from "@/features/list-manage";
import { ListCard } from "@/widgets/task-list";
import { getUsernameFromToken } from "@/shared/lib";

export const MyTasksPage = () => {
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const { data: listsData, isLoading: listsLoading, error: listsError } = useTaskListList();
  const { mutate: createList } = useCreateTaskList(0);
  const { mutate: deleteList } = useDeleteTaskList();

  const { mutate: createTask } = useCreateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: toggleTask } = useToggleTask();
  const { mutate: updateTask } = useUpdateTask();

  const lists = useMemo(
    () => listsData?.map((list) => ({ id: list.id, title: list.title })) ?? [],
    [listsData]
  );

  // Задачи уже приходят в списках, используем их напрямую
  const tasks = useMemo(() => {
    if (!selectedListId || !listsData) return [];
    const selectedList = listsData.find((list) => list.id === selectedListId);
    return selectedList?.tasks ?? [];
  }, [selectedListId, listsData]);

  useMemo(() => {
    if (!selectedListId && lists.length > 0) {
      setSelectedListId(lists[0].id);
    }
  }, [lists, selectedListId]);

  const selectedList = lists.find((l) => l.id === selectedListId);

  const handleAddTask = (title: string) => {
    if (!selectedListId) return;
    const username = getUsernameFromToken();
    createTask({
      listId: selectedListId,
      data: {
        title,
        description: "",
        deadline: new Date().toISOString(),
        ...(username && {
          executor: {
            username,
          },
        }),
      },
    });
  };

  const handleToggleTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      toggleTask({ taskId, done: !task.done });
    }
  };

  const handleEditTask = (taskId: number, title: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    
    updateTask({
      taskId,
      data: {
        title,
        description: task.description || "",
        deadline: task.deadline || new Date().toISOString(),
        ...(task.executor && {
          executor: {
            username: task.executor.username,
          },
        }),
      },
    });
  };

  const handleDeleteList = (listId: number) => {
    deleteList(listId, {
      onSuccess: () => {
        if (selectedListId === listId) {
          setSelectedListId(lists[0]?.id || null);
        }
      },
    });
  };

  if (listsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (listsError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Мои задачи</h1>
          <p className="text-sm text-gray-500 mt-1">Управляйте своими списками и задачами</p>
        </div>
        <div className="h-[calc(100vh-120px)] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ошибка загрузки</h2>
            <p className="text-gray-600 mb-6">
              Не удалось загрузить списки задач. Пожалуйста, попробуйте обновить страницу.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!listsLoading && lists.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Мои задачи</h1>
          <p className="text-sm text-gray-500 mt-1">Управляйте своими списками и задачами</p>
        </div>

        <div className="h-[calc(100vh-120px)] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📋</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Создайте свой первый список</h2>
            <p className="text-gray-600 mb-6">
              Начните организовывать свои задачи, создав список
            </p>
            <button
              onClick={() => {
                const listName = prompt("Название списка:");
                if (listName?.trim()) {
                  createList(listName);
                }
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Создать список
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Мои задачи</h1>
        <p className="text-sm text-gray-500 mt-1">Управляйте своими списками и задачами</p>
      </div>

      <div className="h-[calc(100vh-120px)] flex gap-4">
        <div className="w-80 flex-shrink-0">
          <ListsSidebar
            lists={lists}
            selectedListId={selectedListId}
            setSelectedListId={setSelectedListId}
            onAddList={createList}
            onRemoveList={handleDeleteList}
          />
        </div>

        <div className="flex-1 min-w-0">
          {selectedList ? (
            <ListCard
              list={selectedList}
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onRemoveTask={(taskId: number) => deleteTask(taskId)}
              onEditTask={handleEditTask}
              onRemoveList={() => handleDeleteList(selectedList.id)}
            />
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center h-full flex items-center justify-center">
              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👈</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Выберите список</h3>
                <p className="text-gray-500">Выберите список слева, чтобы просмотреть задачи</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
