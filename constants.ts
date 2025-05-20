import React from 'react';
import { TemperatureUnit, WeightUnit, ConversionTypeConfig, UnitSymbol } from './types';

const DECIMAL_PLACES = 2;

export const formatNumber = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return '';
  // Use toFixed for rounding, then parseFloat to remove trailing zeros if it's an integer after rounding, then toString.
  // Or simply use toFixed and let it have .00
  const fixed = num.toFixed(DECIMAL_PLACES);
  // Optionally remove .00 for whole numbers
  // if (fixed.endsWith(`.${'0'.repeat(DECIMAL_PLACES)}`)) {
  //  return parseInt(fixed).toString();
  // }
  return fixed;
};

export const parseInput = (value: string): number => {
  if (value.trim() === '') return NaN;
  return parseFloat(value);
};

// Temperature Converter
const convertTemperature = (value: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number => {
  if (fromUnit === toUnit) return value;
  if (fromUnit === TemperatureUnit.CELSIUS && toUnit === TemperatureUnit.FAHRENHEIT) {
    return (value * 9/5) + 32;
  }
  if (fromUnit === TemperatureUnit.FAHRENHEIT && toUnit === TemperatureUnit.CELSIUS) {
    return (value - 32) * 5/9;
  }
  return NaN; // Should not happen with known units
};

// FIX: Define TemperatureIcon using React.createElement to avoid JSX parsing issues in .ts file
const TemperatureIcon: React.FC = () => React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5, // Changed from string to number for React prop
    stroke: "currentColor",
    className: "w-5 h-5 mr-2"
  },
  React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-6.867 8.209 8.209 0 013 2.48Z"
  }),
  React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18Z"
  })
);

export const TEMPERATURE_CONVERTER: ConversionTypeConfig<TemperatureUnit> = {
  id: 'temperature',
  name: 'Temperature',
  units: [
    { value: TemperatureUnit.CELSIUS, label: 'Celsius (°C)' },
    { value: TemperatureUnit.FAHRENHEIT, label: 'Fahrenheit (°F)' },
  ],
  convert: convertTemperature,
  // FIX: Use the TemperatureIcon component in the getIcon function.
  getIcon: () => React.createElement(TemperatureIcon),
};

// Weight Converter
const convertWeight = (value: number, fromUnit: WeightUnit, toUnit: WeightUnit): number => {
  const KILOGRAMS_TO_POUNDS = 2.2046226218;
  if (fromUnit === toUnit) return value;
  if (fromUnit === WeightUnit.KILOGRAMS && toUnit === WeightUnit.POUNDS) {
    return value * KILOGRAMS_TO_POUNDS;
  }
  if (fromUnit === WeightUnit.POUNDS && toUnit === WeightUnit.KILOGRAMS) {
    return value / KILOGRAMS_TO_POUNDS;
  }
  return NaN; // Should not happen
};

// FIX: Define WeightIcon using React.createElement to avoid JSX parsing issues in .ts file
const WeightIcon: React.FC = () => React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5, // Changed from string to number for React prop
    stroke: "currentColor",
    className: "w-5 h-5 mr-2"
  },
  React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.286-1.047a1.125 1.125 0 011.472 1.047l-.98 4.873m0 0a3.375 3.375 0 01-6.47 0l-.98-4.873a1.125 1.125 0 011.472-1.047L18.75 4.971m-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.286-1.047A1.125 1.125 0 016.214 4l-.98 4.873m0 0a3.375 3.375 0 01-6.47 0L5.25 4.97M9 9.75l3 3m0 0l3-3m-3 3v-6m-1.5 6H7.5m6 0H15"
  })
);

export const WEIGHT_CONVERTER: ConversionTypeConfig<WeightUnit> = {
  id: 'weight',
  name: 'Weight',
  units: [
    { value: WeightUnit.KILOGRAMS, label: 'Kilograms (kg)' },
    { value: WeightUnit.POUNDS, label: 'Pounds (lb)' },
  ],
  convert: convertWeight,
  // FIX: Use the WeightIcon component in the getIcon function.
  getIcon: () => React.createElement(WeightIcon),
};

export const ALL_CONVERTERS: ConversionTypeConfig<any>[] = [TEMPERATURE_CONVERTER, WEIGHT_CONVERTER];