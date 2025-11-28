import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, Layout, Trash2 } from "lucide-react";
import { useProject, useCreateBoard, useDeleteBoard } from "@/entities/project";
import {
  useCreateTaskList,
  useDeleteTaskList,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useToggleTask,
} from "@/entities/task-list";
import { TaskListColumn, AddTaskListSection, AddBoardButton } from "@/widgets/project-board";
import { getUsernameFromToken } from "@/shared/lib";

export const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const projectIdNum = projectId ? Number(projectId) : null;

  const { data: project, isLoading, error } = useProject(projectIdNum);

  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  // Мутации для досок
  const { mutate: createBoard } = useCreateBoard(projectIdNum ?? 0);
  const { mutate: deleteBoard } = useDeleteBoard(projectIdNum ?? 0);

  // Мутации для списков и задач
  const { mutate: createTaskList } = useCreateTaskList(selectedBoardId ?? 0, projectIdNum ?? undefined);
  const { mutate: deleteTaskList } = useDeleteTaskList(projectIdNum ?? undefined);
  const { mutate: createTask } = useCreateTask(projectIdNum ?? undefined);
  const { mutate: updateTask } = useUpdateTask(projectIdNum ?? undefined);
  const { mutate: deleteTask } = useDeleteTask(projectIdNum ?? undefined);
  const { mutate: toggleTask } = useToggleTask(projectIdNum ?? undefined);

  const boards = useMemo(() => project?.boards ?? [], [project]);
  const selectedBoard = useMemo(
    () => boards.find((b) => b.id === selectedBoardId) || boards[0],
    [boards, selectedBoardId]
  );

  // Автовыбор первой доски
  useMemo(() => {
    if (!selectedBoardId && boards.length > 0) {
      setSelectedBoardId(boards[0].id);
    }
  }, [boards, selectedBoardId]);

  const taskLists = selectedBoard?.taskLists ?? [];

  const handleBack = () => navigate("/company");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Проект не найден</h2>
          <button
            onClick={handleBack}
            className="text-blue-500 hover:text-blue-600"
          >
            Вернуться к проектам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                  {project.title[0].toUpperCase()}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{project.title}</h1>
                  <p className="text-sm text-gray-500">{project.users.length} участников</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Board Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {boards.map((board) => (
            <div
              key={board.id}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap group ${
                selectedBoardId === board.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <button
                onClick={() => setSelectedBoardId(board.id)}
                className="flex items-center gap-2"
              >
                <Layout size={16} />
                {board.title}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Удалить доску "${board.title}"?`)) {
                    deleteBoard(board.id);
                    if (selectedBoardId === board.id) {
                      setSelectedBoardId(boards[0]?.id ?? null);
                    }
                  }
                }}
                className="p-1 text-gray-400 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <AddBoardButton onAdd={createBoard} />
        </div>
      </div>

      {/* Board Content */}
      <main className="p-6">
        {boards.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Layout size={40} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Нет досок</h2>
              <p className="text-gray-600 mb-6">
                Создайте первую доску для организации задач
              </p>
              <button
                onClick={() => {
                  const title = prompt("Название доски:");
                  if (title?.trim()) {
                    createBoard(title.trim());
                  }
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Создать доску
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            <AnimatePresence mode="popLayout">
              {taskLists.map((taskList) => (
                <TaskListColumn
                  key={taskList.id}
                  taskList={taskList}
                  onAddTask={(title) => {
                    // Создаем задачу в этом списке
                    const username = getUsernameFromToken();
                    createTask({
                      listId: taskList.id,
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
                  }}
                  onToggleTask={(taskId) => {
                    const task = taskList.tasks?.find((t) => t.id === taskId);
                    if (task) {
                      toggleTask({ taskId, done: !task.done });
                    }
                  }}
                  onEditTask={(taskId, newTitle, originalTask) => {
                    updateTask({
                      taskId,
                      data: {
                        title: newTitle,
                        description: originalTask.description || "",
                        deadline: originalTask.deadline || new Date().toISOString(),
                        ...(originalTask.executor && {
                          executor: {
                            username: originalTask.executor.username,
                          },
                        }),
                      },
                    });
                  }}
                  onRemoveTask={(taskId) => deleteTask(taskId)}
                  onRemoveList={() => deleteTaskList(taskList.id)}
                  onRenameList={(title) => {
                    // TODO: API для переименования списка
                    console.log("Rename list", taskList.id, title);
                  }}
                />
              ))}
            </AnimatePresence>

            <AddTaskListSection
              onAdd={(title) => createTaskList(title)}
            />
          </div>
        )}
      </main>
    </div>
  );
};
