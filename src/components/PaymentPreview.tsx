import React from 'react';
import { Printer, Receipt, Loader2 } from 'lucide-react';

interface PaymentPreviewProps {
  startTime: string;
  endTime: string;
  total: number;
  currentDate: string;
  licensePlate: string;
  ownerName: string;
  vehicleType: string;
  onConfirm: () => void;
  isLoading: boolean;
}

export function PaymentPreview({
  startTime,
  endTime,
  total,
  currentDate,
  licensePlate,
  ownerName,
  vehicleType,
  onConfirm,
  isLoading,
}: PaymentPreviewProps) {
  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Vista Previa</h3>
        <Receipt className="w-5 h-5 text-indigo-600" />
      </div>

      <div className="space-y-3">
        <div className="text-center">
          <span className="font-medium">{currentDate}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-600">Placa:</div>
          <div className="font-medium text-right">{licensePlate}</div>
          
          <div className="text-gray-600">Propietario:</div>
          <div className="font-medium text-right">{ownerName}</div>
          
          <div className="text-gray-600">Tipo de Vehículo:</div>
          <div className="font-medium text-right">{vehicleType}</div>
          
          <div className="text-gray-600">Hora Inicio:</div>
          <div className="font-medium text-right">{formatTime(startTime)}</div>
          
          <div className="text-gray-600">Hora Fin:</div>
          <div className="font-medium text-right">{formatTime(endTime)}</div>
          
          <div className="text-gray-600 font-semibold">Total:</div>
          <div className="font-semibold text-right">${total.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-2.5 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center"
          disabled={isLoading}
        >
          <Printer className="w-4 h-4 mr-2" />
          Imprimir
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            'Confirmar Pago'
          )}
        </button>
      </div>
    </div>
  );
}