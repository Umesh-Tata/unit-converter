import React from 'react';

export interface SegmentedControlOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  activeOptionId: string;
  onSelectOption: (id: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, activeOptionId, onSelectOption }) => {
  return (
    <div className="flex bg-slate-200 rounded-lg p-1 mb-6 shadow">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelectOption(option.id)}
          className={`
            flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            flex items-center justify-center
            ${
              activeOptionId === option.id
                ? 'bg-white text-indigo-600 shadow'
                : 'text-slate-600 hover:bg-slate-300'
            }
          `}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};
