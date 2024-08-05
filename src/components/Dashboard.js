import React, { useState } from 'react';
import api from '../api';
import './Dashboard.css';
function Dashboard() {
  const [trains, setTrains] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const fetchTrains = async () => {
    try {
      const response = await api.get(`/trains?source=${source}&destination=${destination}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTrains(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch trains');
    }
  };

  const handleBook = async (trainId) => {
    try {
      const response = await api.post(
        '/bookings',
        { train_id: trainId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Booking failed');
    }
  };

  return (
    <div className="background-img">
      <h2 className ="heading">Dashboard</h2>
      <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
      <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <button className='button' onClick={fetchTrains}>Search</button>
      <div>
        {trains.map((train) => (
          <div key={train.id}>
            <h3>{train.train_name}</h3>
            <p>Available Seats: {train.available_seats}</p>
            <button onClick={() => handleBook(train.id)} disabled={train.available_seats <= 0}>
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

