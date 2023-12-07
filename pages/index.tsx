import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import SearchTrips from '@/components/SearchTrips'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Header />
      <SearchTrips />
    </main>
  )
}
