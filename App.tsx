import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UnitConverterCard } from './components/UnitConverterCard';
import { SegmentedControl, SegmentedControlOption } from './components/SegmentedControl';
import { ALL_CONVERTERS, TEMPERATURE_CONVERTER } from './constants';
import { ConversionTypeConfig, UnitSymbol } from './types';

const App: React.FC = () => {
  const [activeConverterId, setActiveConverterId] = useState<string>(TEMPERATURE_CONVERTER.id);
  const [selectedConverterConfig, setSelectedConverterConfig] = useState<ConversionTypeConfig<any> | undefined>(TEMPERATURE_CONVERTER);

  useEffect(() => {
    const newConfig = ALL_CONVERTERS.find(c => c.id === activeConverterId);
    setSelectedConverterConfig(newConfig);
  }, [activeConverterId]);

  const segmentedOptions: SegmentedControlOption[] = ALL_CONVERTERS.map(converter => ({
    id: converter.id,
    label: converter.name,
    icon: converter.getIcon ? converter.getIcon() : undefined,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Unit Converter" />
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-lg mx-auto">
          <SegmentedControl
            options={segmentedOptions}
            activeOptionId={activeConverterId}
            onSelectOption={setActiveConverterId}
          />
          {selectedConverterConfig ? (
            <UnitConverterCard key={selectedConverterConfig.id} config={selectedConverterConfig} />
          ) : (
            <p className="text-center text-gray-500 mt-8">Select a converter type.</p>
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-slate-500">
        Unit Converter &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
