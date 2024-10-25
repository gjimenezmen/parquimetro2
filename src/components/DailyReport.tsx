import React, { useState } from 'react';
import { ArrowLeft, Download, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Transaction {
  ticketNumber: string;
  licensePlate: string;
  ownerName: string;
  vehicleType: string;
  startTime: string;
  endTime: string;
  total: number;
  date: string;
}

interface DailyReportProps {
  transactions: Transaction[];
  onBack: () => void;
  onLogout: () => void;
}

export function DailyReport({ transactions, onBack }: DailyReportProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const filteredTransactions = transactions.filter(t => 
    new Date(t.date).toISOString().split('T')[0] === selectedDate
  );

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalVehicles = filteredTransactions.length;

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Reporte Diario de Parquímetro', 20, 20);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date(selectedDate).toLocaleDateString()}`, 20, 30);
    
    // Add summary
    doc.text(`Total Recaudado: $${totalAmount.toFixed(2)}`, 20, 40);
    doc.text(`Total Vehículos: ${totalVehicles}`, 20, 50);
    
    // Add transactions table
    const tableData = filteredTransactions.map(t => [
      t.ticketNumber,
      t.licensePlate,
      t.ownerName,
      t.vehicleType,
      `$${t.total.toFixed(2)}`
    ]);

    (doc as any).autoTable({
      startY: 60,
      head: [['Ticket', 'Placa', 'Propietario', 'Tipo', 'Total']],
      body: tableData,
    });
    
    doc.save(`reporte-parquimetro-${selectedDate}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 hover:bg-indigo-500 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Reporte Diario</h1>
            </div>
            <button
              onClick={downloadPDF}
              className="flex items-center bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Descargar PDF
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Calendar className="w-5 h-5 text-gray-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-600">Total Recaudado</h3>
              <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-600">Total Vehículos</h3>
              <p className="text-2xl font-bold">{totalVehicles}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.ticketNumber}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.ticketNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.licensePlate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.ownerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.vehicleType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}