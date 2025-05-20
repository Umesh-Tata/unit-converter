import React, { useState, useEffect } from 'react';
import { ConversionTypeConfig, UnitSymbol, UnitOption } from '../types';
import { formatNumber, parseInput } from '../constants';

interface UnitConverterCardProps {
  config: ConversionTypeConfig<any>; // Using 'any' for generic UnitSymbol here for simplicity
}

const SwapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className || "w-6 h-6 text-slate-500"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
);


interface ConverterInputGroupProps<T extends UnitSymbol> {
  inputId: string;
  value: string;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedUnit: T;
  onUnitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  unitOptions: UnitOption<T>[];
  label: string;
}

const ConverterInputGroup = <T extends UnitSymbol>({
  inputId,
  value,
  onValueChange,
  selectedUnit,
  onUnitChange,
  unitOptions,
  label,
}: ConverterInputGroupProps<T>) => {
  return (
    <div className="space-y-2">
       <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        id={inputId}
        type="number"
        step="any" // Allows decimal inputs
        value={value}
        onChange={onValueChange}
        placeholder="Enter value"
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        aria-label={`${label} input`}
      />
      <select
        value={selectedUnit}
        onChange={onUnitChange}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors"
        aria-label={`${label} unit selection`}
      >
        {unitOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}


export const UnitConverterCard: React.FC<UnitConverterCardProps> = ({ config }) => {
  const [inputValue1, setInputValue1] = useState<string>('');
  const [selectedUnit1, setSelectedUnit1] = useState<UnitSymbol>(config.units[0].value);
  
  const [inputValue2, setInputValue2] = useState<string>('');
  const [selectedUnit2, setSelectedUnit2] = useState<UnitSymbol>(config.units[1]?.value || config.units[0].value);

  // Reset state when config changes (e.g., switching between Temp and Weight)
  useEffect(() => {
    setInputValue1('');
    setInputValue2('');
    if (config.units.length > 0) {
      setSelectedUnit1(config.units[0].value);
      setSelectedUnit2(config.units[1]?.value || config.units[0].value);
    }
  }, [config]);

  const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue1(rawValue);
    const numValue = parseInput(rawValue);
    if (!isNaN(numValue)) {
      const convertedValue = config.convert(numValue, selectedUnit1, selectedUnit2);
      setInputValue2(formatNumber(convertedValue));
    } else {
      setInputValue2('');
    }
  };

  const handleUnit1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as UnitSymbol;
    setSelectedUnit1(newUnit);
    const numValue1 = parseInput(inputValue1);
    if (!isNaN(numValue1)) {
      const convertedValue = config.convert(numValue1, newUnit, selectedUnit2);
      setInputValue2(formatNumber(convertedValue));
    }
  };

  const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue2(rawValue);
    const numValue = parseInput(rawValue);
    if (!isNaN(numValue)) {
      const convertedValue = config.convert(numValue, selectedUnit2, selectedUnit1);
      setInputValue1(formatNumber(convertedValue));
    } else {
      setInputValue1('');
    }
  };

  const handleUnit2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as UnitSymbol;
    setSelectedUnit2(newUnit);
    const numValue2 = parseInput(inputValue2);
    if (!isNaN(numValue2)) { // Check inputValue2 for a valid number
      const convertedValue = config.convert(numValue2, newUnit, selectedUnit1);
      setInputValue1(formatNumber(convertedValue));
    // FIX: Corrected comparison from `parseInput(inputValue1) === ''` (number === string) to `inputValue1.trim() === ''` (string === string).
    // This checks if inputValue1 is empty when inputValue2 is also empty (implied by numValue2 being NaN and the second part of the condition).
    } else if (inputValue1.trim() === '' && inputValue2.trim() === '') { // Clear other field if both are empty string
        setInputValue1('');
    }
  };
  
  const handleSwapUnits = () => {
    const tempVal1 = inputValue1;
    const tempUnit1 = selectedUnit1;

    setInputValue1(inputValue2);
    setSelectedUnit1(selectedUnit2);
    
    setInputValue2(tempVal1);
    setSelectedUnit2(tempUnit1);
  };


  return (
    <div className="bg-white p-6 rounded-xl shadow-xl mt-4">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">{config.name}</h2>
      
      <div className="space-y-6">
        <ConverterInputGroup
          inputId={`${config.id}-input1`}
          value={inputValue1}
          onValueChange={handleValue1Change}
          selectedUnit={selectedUnit1}
          onUnitChange={handleUnit1Change}
          unitOptions={config.units}
          label={config.units.find(u => u.value === selectedUnit1)?.label || "From"}
        />

        <div className="flex justify-center items-center my-4">
          <button 
            onClick={handleSwapUnits} 
            className="p-2 rounded-full hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Swap units and values"
          >
            <SwapIcon className="w-6 h-6 text-indigo-600" />
          </button>
        </div>
        
        <ConverterInputGroup
          inputId={`${config.id}-input2`}
          value={inputValue2}
          onValueChange={handleValue2Change}
          selectedUnit={selectedUnit2}
          onUnitChange={handleUnit2Change}
          unitOptions={config.units}
          label={config.units.find(u => u.value === selectedUnit2)?.label || "To"}
        />
      </div>
    </div>
  );
};