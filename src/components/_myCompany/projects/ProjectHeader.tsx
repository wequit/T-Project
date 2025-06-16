import type { FC } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Edit2, Users, Settings } from "lucide-react";

interface ProjectHeaderProps {
  project: { name: string };
  isEditingProject: boolean;
  setIsEditingProject: (val: boolean) => void;
  projectName: string;
  setProjectName: (val: string) => void;
  handleProjectUpdate: () => void;
  onBack: () => void;
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({
  project,
  isEditingProject,
  setIsEditingProject,
  projectName,
  setProjectName,
  handleProjectUpdate,
  onBack,
}) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>

            {isEditingProject ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Project name"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleProjectUpdate}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingProject(false)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
                <button
                  onClick={() => setIsEditingProject(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Users className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
