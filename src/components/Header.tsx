import React from 'react';
import { Car, LogOut } from 'lucide-react';

interface HeaderProps {
  ratePerHour: number;
  onLogout: () => void;
}

export function Header({ ratePerHour, onLogout }: HeaderProps) {
  return (
    <div className="bg-indigo-600 p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Parquímetro Digital</h1>
        <Car className="w-8 h-8" />
      </div>
      <div className="flex justify-between items-center">
        <p className="opacity-90">Tarifa: ${ratePerHour.toFixed(2)}/hora</p>
        <button
          onClick={onLogout}
          className="flex items-center text-sm bg-indigo-500 hover:bg-indigo-400 px-3 py-1.5 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}