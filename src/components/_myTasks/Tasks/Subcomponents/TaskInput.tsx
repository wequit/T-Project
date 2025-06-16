import { Plus, X } from "lucide-react";

type TaskInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  disabled?: boolean;
};

export const TaskInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  onClear, 
  disabled = false 
}: TaskInputProps) => (
  <div className="flex flex-col gap-5">
    <div className="relative">
      <input
        type="text"
        placeholder="Что нужно сделать?"
        className="w-full px-5 py-3 border-0 rounded-2xl bg-gray-50 focus:bg-gray-100 focus:ring-2 focus:ring-gray-200 text-gray-800 placeholder-gray-400 transition-all duration-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </div>

    {!disabled && (
      <button
        onClick={onSubmit}
        className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:shadow-md transition-all flex items-center justify-center gap-2 font-medium text-sm tracking-wide"
      >
        <Plus size={18} strokeWidth={2.5} />
        Добавить задачу
      </button>
    )}
  </div>
);