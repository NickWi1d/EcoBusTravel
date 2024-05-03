import React, { useEffect } from 'react';
// import L from 'leaflet';
import { clearSeatsInfo } from '@/components/CreateOrder/ChoosePlaces';
import { SearchTrips } from '@/components/SearchTrips/SearchTrips';

const Home = () => {
  useEffect(() => {
    clearSeatsInfo();
  }, []);

  // useEffect(() => {
  //   const renderMap = async () => {
  //     const map = L.map('map').setView([51.505, -0.09], 13);
  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '© OpenStreetMap contributors'
  //     }).addTo(map);
  //   };

  //   if (!L) {
  //     renderMap();
  //   }
  // }, []);

  return (
    <main>
      <SearchTrips />
      {/* <div id="map" style={{ height: '400px' }}></div> */}
    </main>
  );
};

export default Home;
