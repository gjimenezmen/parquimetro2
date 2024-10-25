import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import { Header } from './components/Header';
import { VehicleForm } from './components/VehicleForm';
import { TimeSelector } from './components/TimeSelector';
import { ParkingTicket } from './components/ParkingTicket';
import { PaymentPreview } from './components/PaymentPreview';
import { Login } from './components/Login';

function App() {
  const RATE_PER_HOUR = 2.50;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showTicket, setShowTicket] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<string>('');
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`2024-01-01T${startTime}`);
      const end = new Date(`2024-01-01T${endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      setTotal(Math.max(0, hours * RATE_PER_HOUR));
    }
  }, [startTime, endTime]);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciales inválidas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    try {
      const newTicketNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
      setTicketNumber(newTicketNumber);
      setShowPreview(false);
      setShowTicket(true);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error al procesar el pago. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewTransaction = () => {
    setShowTicket(false);
    setShowPreview(false);
    setStartTime('');
    setEndTime('');
    setLicensePlate('');
    setOwnerName('');
    setVehicleType('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <Header ratePerHour={RATE_PER_HOUR} onLogout={handleLogout} />

        {!showTicket && !showPreview ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <VehicleForm
              licensePlate={licensePlate}
              setLicensePlate={setLicensePlate}
              ownerName={ownerName}
              setOwnerName={setOwnerName}
              vehicleType={vehicleType}
              setVehicleType={setVehicleType}
            />

            <TimeSelector
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              currentDate={currentDate}
            />

            {total > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total a pagar:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Continuar al pago
            </button>
          </form>
        ) : showPreview ? (
          <div className="p-6">
            <PaymentPreview
              startTime={startTime}
              endTime={endTime}
              total={total}
              currentDate={currentDate}
              licensePlate={licensePlate}
              ownerName={ownerName}
              vehicleType={vehicleType}
              onConfirm={handleConfirmPayment}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <ParkingTicket
            ticketNumber={ticketNumber}
            startTime={startTime}
            endTime={endTime}
            total={total}
            currentDate={currentDate}
            licensePlate={licensePlate}
            ownerName={ownerName}
            vehicleType={vehicleType}
            onNewTransaction={handleNewTransaction}
          />
        )}
      </div>
    </div>
  );
}

export default App;