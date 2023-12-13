import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import SearchTrips from '@/components/SearchTrips'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const handleSaveData = async () => {
    const response = await fetch('/api/setBusTrips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ info: 'test', user: 'NickWild' }),
    });
  };
  
  const handleButtonClick = async () => {
    try {
      const response = await fetch('/api/busTrips');
      const data = await response.json();
      console.log(data.busTrips);
    } catch (error) {
      console.error('Error fetching bus trips:', error);
    }
  };
  return (
    <main>
      <Header />
      <SearchTrips />
      {/* <button onClick={handleButtonClick}>Get Data</button>
      <button onClick={handleSaveData}>Set Data</button> */}
    </main>
  )
}
