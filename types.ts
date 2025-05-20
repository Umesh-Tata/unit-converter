export enum TemperatureUnit {
  CELSIUS = 'CELSIUS',
  FAHRENHEIT = 'FAHRENHEIT',
}

export enum WeightUnit {
  KILOGRAMS = 'KILOGRAMS',
  POUNDS = 'POUNDS',
}

export type UnitSymbol = TemperatureUnit | WeightUnit;

export interface UnitOption<T extends UnitSymbol> {
  value: T;
  label: string;
}

export interface ConversionTypeConfig<T extends UnitSymbol> {
  id: string;
  name: string;
  units: UnitOption<T>[];
  convert: (value: number, fromUnit: T, toUnit: T) => number;
  getIcon?: () => React.ReactNode; // Optional: for segmented control
}
