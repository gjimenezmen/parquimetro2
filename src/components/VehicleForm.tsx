import React from 'react';
import { Car } from 'lucide-react';

interface VehicleFormProps {
  licensePlate: string;
  setLicensePlate: (value: string) => void;
  ownerName: string;
  setOwnerName: (value: string) => void;
  vehicleType: string;
  setVehicleType: (value: string) => void;
}

export function VehicleForm({
  licensePlate,
  setLicensePlate,
  ownerName,
  setOwnerName,
  vehicleType,
  setVehicleType,
}: VehicleFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center text-gray-700 font-medium">
          <Car className="w-5 h-5 mr-2" />
          Número de Placa
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
          placeholder="ABC-123"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-gray-700 font-medium">
          Nombre del Propietario
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Nombre completo"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-gray-700 font-medium">
          Tipo de Vehículo
        </label>
        <select
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="">Seleccionar tipo</option>
          <option value="automóvil">Automóvil</option>
          <option value="motocicleta">Motocicleta</option>
          <option value="camioneta">Camioneta</option>
          <option value="otro">Otro</option>
        </select>
      </div>
    </div>
  );
}