import React, { useEffect, useState } from 'react';
// import L from 'leaflet';
import { clearSeatsInfo } from '@/components/CreateOrder/ChoosePlaces';
import { SearchTrips } from '@/components/SearchTrips/SearchTrips';
import { useLazyGetCitesQuery } from '@/store/reducers/api/app';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Home = () => {

  const [getCites, { isLoading: isGetCitesLoading, isError: iGetCitesError, data: GetCitesData, isSuccess: GetCitesSuccess, error: GetCitesError }] = useLazyGetCitesQuery()


  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    clearSeatsInfo();
    getCites({})
  }, []);

  useEffect(() => {
    if (GetCitesSuccess  && GetCitesData){
      console.log(GetCitesData.cities[0].cities);
      setCities(GetCitesData.cities[0].cities)
    }
  }, [GetCitesSuccess, GetCitesData])


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
      <SearchTrips cities={cities}/>
      <About></About>
      <Footer></Footer>
      {/* <div id="map" style={{ height: '400px' }}></div> */}
    </main>
  );
};

export default Home;
