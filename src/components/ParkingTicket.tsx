import React from 'react';
import { Receipt, Printer } from 'lucide-react';

interface ParkingTicketProps {
  ticketNumber: string;
  startTime: string;
  endTime: string;
  total: number;
  currentDate: string;
  licensePlate: string;
  ownerName: string;
  vehicleType: string;
  onNewTransaction: () => void;
}

export function ParkingTicket({
  ticketNumber,
  startTime,
  endTime,
  total,
  currentDate,
  licensePlate,
  ownerName,
  vehicleType,
  onNewTransaction,
}: ParkingTicketProps) {
  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="print-content border-2 border-dashed border-indigo-200 rounded-lg p-6 space-y-4">
        <div className="text-center border-b border-gray-200 pb-4">
          <h1 className="text-xl font-bold mb-2">Parquímetro Digital</h1>
          <div className="flex justify-center items-center gap-2 mb-2">
            <Receipt className="w-5 h-5" />
            <span className="font-mono font-bold">{ticketNumber}</span>
          </div>
          <div className="text-sm">{currentDate}</div>
        </div>
        
        <div className="space-y-4 py-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="font-semibold">Placa:</div>
            <div className="text-right">{licensePlate}</div>
            
            <div className="font-semibold">Propietario:</div>
            <div className="text-right">{ownerName}</div>
            
            <div className="font-semibold">Tipo de Vehículo:</div>
            <div className="text-right">{vehicleType}</div>
          </div>
        </div>

        <div className="space-y-2 py-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="font-semibold">Hora Inicio:</div>
            <div className="text-right">{formatTime(startTime)}</div>
            
            <div className="font-semibold">Hora Fin:</div>
            <div className="text-right">{formatTime(endTime)}</div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center text-xs mt-6 pt-4 border-t border-gray-200">
          Gracias por usar nuestro servicio
        </div>
      </div>

      <div className="flex gap-3 no-print">
        <button
          onClick={() => window.print()}
          className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center"
        >
          <Printer className="w-4 h-4 mr-2" />
          Imprimir Ticket
        </button>
        <button
          onClick={onNewTransaction}
          className="flex-1 bg-indigo-100 text-indigo-600 py-3 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
        >
          Nueva transacción
        </button>
      </div>
    </div>
  );
}