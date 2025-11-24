import type { FC } from "react";

interface AddColumnSectionProps {
  newColumnName: string;
  isAdding: boolean;
  onChange: (name: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export const AddColumnSection: FC<AddColumnSectionProps> = ({
  newColumnName,
  isAdding,
  onChange,
  onAdd,
  onCancel,
}) => {
  if (!isAdding) {
    return (
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-gray-600 border border-gray-100 w-72"
      >
        <span className="text-sm">＋ Добавить колонку</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl p-3 w-72 shadow-sm border border-gray-100">
      <input
        type="text"
        value={newColumnName}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Column name"
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 mb-2"
        onKeyDown={(e) => {
          if (e.key === "Enter" && newColumnName.trim()) {
            onAdd();
          }
        }}
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={onAdd}
          className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
        >
          Добавить колонку
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};


