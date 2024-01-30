import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import SearchTrips from '@/components/SearchTrips'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '@/redux/authSlice'
import { GET } from '@/lib/user';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const dispatch = useDispatch()
  async function getDataAboutCurrentUser(username:string, type:string) {
    const statusResult = await GET(username, type)
    if (statusResult?.message === 'SUCCESSFULLY') {
      console.log(statusResult.password)
      dispatch(logIn({
        user: username
      }))
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem('token')
    console.log(token)
    const currentUser = localStorage.getItem('user')
    console.log(currentUser)
    if(token && currentUser){
      //запрос к бд + добавление в диспатч true
      getDataAboutCurrentUser(currentUser, 'GET_DATA')
    }else{
      dispatch(logOut({}))
    }
  },[])
  return (
    <main>
      <Header />
      <SearchTrips />
    </main>
  )
}
