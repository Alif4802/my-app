import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ReservationModal from './ReservationModal';

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleOpenReservation = () => {
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
  };

  return (
    <>
      <Header onOpenReservation={handleOpenReservation} />
      <Main onOpenReservation={handleOpenReservation} />
      <Footer />
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={handleCloseReservation} 
      />
    </>
  );
}

export default App;
