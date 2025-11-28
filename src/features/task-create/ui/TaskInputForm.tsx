import { useState } from "react";

type TaskInputFormProps = {
  onSubmit: (title: string) => void;
  onCancel: () => void;
  placeholder?: string;
};

export const TaskInputForm = ({
  onSubmit,
  onCancel,
  placeholder = "Название задачи...",
}: TaskInputFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") onCancel();
          }}
          autoFocus
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
        >
          Добавить
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

