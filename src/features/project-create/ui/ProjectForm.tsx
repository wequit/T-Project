import { useState } from "react";

type ProjectFormProps = {
  onSubmit: (name: string, description: string, color: string) => void;
  onCancel: () => void;
};

const PROJECT_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export const ProjectForm = ({ onSubmit, onCancel }: ProjectFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0]);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name, description, selectedColor);
      setName("");
      setDescription("");
      setSelectedColor(PROJECT_COLORS[0]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">Создать новый проект</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Название проекта"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Описание проекта"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
        <div className="flex gap-2">
          {PROJECT_COLORS.map((color) => (
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
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Создать
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};


