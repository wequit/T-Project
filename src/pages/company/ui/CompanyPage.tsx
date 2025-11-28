import { Plus, Image as ImageIcon, Settings, Users, X, Trash2 } from "lucide-react";
import { useCompanyStore } from "@/entities/company";
import { useCreateProject, useDeleteProject, useProjectList } from "@/entities/project";
import { ProjectForm } from "@/features/project-create";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKGROUND_COLORS = [
  { name: "Белый", value: "#ffffff" },
  { name: "Серый", value: "#f3f4f6" },
  { name: "Голубой", value: "#dbeafe" },
  { name: "Зеленый", value: "#dcfce7" },
  { name: "Желтый", value: "#fef9c3" },
  { name: "Розовый", value: "#fce7f3" },
];

export const CompanyPage = () => {
  const navigate = useNavigate();
  const {
    company,
    updateCompanyBackground,
    updateCompanyImage,
    removeCompanyImage,
  } = useCompanyStore();

  const { data: projectsData, isLoading: projectsLoading } = useProjectList();
  const { mutate: createProject } = useCreateProject();
  const { mutate: deleteProject } = useDeleteProject();
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isBackgroundSettingsOpen, setIsBackgroundSettingsOpen] = useState(false);

  const projects = projectsData || [];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCompanyImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProject = (name: string, description: string) => {
    createProject(
      { title: name, description },
      {
        onSuccess: () => {
          setIsCreatingProject(false);
        },
      }
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: company.backgroundColor,
        backgroundImage: company.backgroundImage
          ? `url(${company.backgroundImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-600 mt-1">{company.description}</p>
          </div>
          <div className="flex gap-2">
            <label className="cursor-pointer p-2 rounded-lg hover:bg-gray-100">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </label>
            <div className="relative">
              <button
                onClick={() => setIsBackgroundSettingsOpen(!isBackgroundSettingsOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              {isBackgroundSettingsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Настройки фона</h3>
                    <button
                      onClick={() => setIsBackgroundSettingsOpen(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Цвет фона
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {BACKGROUND_COLORS.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => {
                              updateCompanyBackground(color.value);
                              removeCompanyImage();
                            }}
                            className={`p-2 rounded-lg text-sm ${
                              company.backgroundColor === color.value
                                ? "ring-2 ring-blue-500"
                                : "hover:bg-gray-50"
                            }`}
                            style={{ backgroundColor: color.value }}
                          >
                            {color.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    {company.backgroundImage && (
                      <button
                        onClick={() => {
                          removeCompanyImage();
                          updateCompanyBackground("#ffffff");
                        }}
                        className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Удалить фоновое изображение
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Создание проекта */}
        {isCreatingProject ? (
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setIsCreatingProject(false)}
          />
        ) : (
          <button
            onClick={() => setIsCreatingProject(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-6"
          >
            <Plus className="w-5 h-5" />
            Создать проект
          </button>
        )}

        {/* Список проектов */}
        {projectsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xl"
                    >
                      {project.title[0].toUpperCase()}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Вы уверены, что хотите удалить проект "${project.title}"?`)) {
                          deleteProject(project.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Users className="w-4 h-4" />
                    <span>{project.users.length} участников</span>
                  </div>
                  {project.boards && project.boards.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {project.boards.length} досок
                    </div>
                  )}
                </div>
              ))}
            </div>

            {projects.length === 0 && !isCreatingProject && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  У вас пока нет проектов
                </h3>
                <p className="text-gray-600">
                  Создайте свой первый проект, чтобы начать работу
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};


