import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      </div>
    </header>
  );
};
