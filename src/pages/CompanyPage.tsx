import { Plus, Image as ImageIcon, Settings, Users, Trash2, X } from "lucide-react";
import { useCompanyStore } from "../store/useCompanyStore";
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
    isCreatingProject,
    newProjectName,
    newProjectDescription,
    selectedColor,
    setNewProjectName,
    setNewProjectDescription,
    setSelectedColor,
    setIsCreatingProject,
    updateCompanyBackground,
    updateCompanyImage,
    removeCompanyImage,
    createProject,
    removeProject,
  } = useCompanyStore();

  const [isBackgroundSettingsOpen, setIsBackgroundSettingsOpen] = useState(false);

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
        {/* Заголовок и настройки */}
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
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Создать новый проект</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Название проекта"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Описание проекта"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />
              <div className="flex gap-2">
                {["#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color ? "ring-2 ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={createProject}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Создать
                </button>
                <button
                  onClick={() => setIsCreatingProject(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className="w-12 h-12 rounded-lg"
                  style={{ backgroundColor: project.color }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProject(project.id);
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-4 h-4" />
                <span>{project.members} участников</span>
              </div>
            </div>
          ))}
        </div>

        {company.projects.length === 0 && !isCreatingProject && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              У вас пока нет проектов
            </h3>
            <p className="text-gray-600">
              Создайте свой первый проект, чтобы начать работу
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 