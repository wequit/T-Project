import { useParams, useNavigate } from "react-router-dom";
import { useProjectStore } from "../store/useProjectStore";
import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo } from "react";
import { ProjectHeader } from "../components/_myCompany/projects/ProjectHeader";
import { ProjectBoardTabs } from "../components/_myCompany/projects/ProjectBoardTabs";
import { ProjectColumnCard } from "../components/_myCompany/projects/ProjectColumnCard";
import { AddColumnSection } from "../components/_myCompany/projects/AddColumnSection";
import { useBoardUI } from "../hooks/useBoardUI";
import { useColumnUI } from "../hooks/useColumnUI";

export const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const store = useProjectStore(projectId);
  const {
    project,
    selectedBoardId,
    setSelectedBoardId,
    addBoard,
    renameBoard,
    removeBoard,
    addColumn,
    renameColumn,
    removeColumn,
    addTask,
    removeTask,
    toggleTask,
    updateProject,
  } = store;

  const [boardUIState, boardDispatch] = useBoardUI();
  const [columnUIState, columnDispatch] = useColumnUI();

  const boards = project?.boards ?? [];
  const selectedBoard = useMemo(
    () => boards.find((b) => b.id === selectedBoardId) || boards[0],
    [boards, selectedBoardId]
  );

  const handleProjectUpdate = useCallback(() => {
    if (!project) return;
    updateProject({ name: project.name });
  }, [project, updateProject]);

  const handleAddColumn = useCallback(() => {
    const name = columnUIState.newColumnName.trim();
    if (!name || !selectedBoard) return;
    addColumn(selectedBoard.id, name);
    columnDispatch({ type: "CANCEL_ADD" });
  }, [columnUIState.newColumnName, selectedBoard, addColumn, columnDispatch]);

  const handleBack = useCallback(() => {
    navigate("/company");
  }, [navigate]);

  if (!project || !selectedBoard) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHeader
        project={project}
        isEditingProject={false} 
        setIsEditingProject={() => {}}
        projectName={project.name}
        setProjectName={() => {}}
        handleProjectUpdate={handleProjectUpdate}
        onBack={handleBack}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ProjectBoardTabs
          boards={boards}
          selectedBoardId={selectedBoardId ?? undefined}
          setSelectedBoardId={setSelectedBoardId}
          boardUI={boardUIState}
          boardDispatch={boardDispatch}
          addBoard={addBoard}
          renameBoard={renameBoard}
          removeBoard={removeBoard}
        />

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {selectedBoard.columns.map((column) => (
              <ProjectColumnCard
                key={column.id}
                column={column}
                selectedBoardId={selectedBoard.id}
                renameColumn={(columnId, name) => renameColumn(selectedBoard.id, columnId, name)}
                removeColumn={(columnId) => removeColumn(selectedBoard.id, columnId)}
                toggleTask={(columnId, taskId) => toggleTask(selectedBoard.id, columnId, taskId)}
                removeTask={(columnId, taskId) => removeTask(selectedBoard.id, columnId, taskId)}
                addTask={(columnId, title) => addTask(selectedBoard.id, columnId, title)}
              />
            ))}
          </AnimatePresence>

          <AddColumnSection
            newColumnName={columnUIState.newColumnName}
            isAdding={columnUIState.isAdding}
            onChange={(value) => columnDispatch({ type: "SET_NAME", payload: value })}
            onAdd={handleAddColumn}
            onCancel={() => columnDispatch({ type: "CANCEL_ADD" })}
          />
        </div>
      </main>
    </div>
  );
};
