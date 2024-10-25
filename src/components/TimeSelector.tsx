import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSelectorProps {
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  currentDate: string;
}

export function TimeSelector({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  currentDate,
}: TimeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <span className="text-lg font-medium text-gray-700">{currentDate}</span>
      </div>
      
      <div className="space-y-2">
        <label className="flex items-center text-gray-700 font-medium">
          <Clock className="w-5 h-5 mr-2" />
          Hora de Inicio
        </label>
        <input
          type="time"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-gray-700 font-medium">
          <Clock className="w-5 h-5 mr-2" />
          Hora de Fin
        </label>
        <input
          type="time"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
    </div>
  );
}