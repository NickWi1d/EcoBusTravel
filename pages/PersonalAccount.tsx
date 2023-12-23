import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut, logIn } from '@/redux/authSlice'

const PersonalAccount = () => {
  const dispatch = useDispatch()
  const router = useRouter()
    function logOuthandler(){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      dispatch(logOut({}))
      router.push('/')
    }

    useEffect(()=>{
      console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('user'))
    },[])
    return (
      <>
      <button onClick={logOuthandler}>Выйти</button>
        {/* <div className="TabMenu">
          <button className="tablink">Личная информация</button>
          <button className="tablink">Мои поездки</button>
          <button className="tablink">Настройки</button>
          <button className="tablink">Выйти</button>
        </div>
        <div className="content">
          <div className="PersonalInfo"></div>
          <div className="myTrips"></div>
          <div className="settings"></div>
        </div> */}
      </>
    )
  }
  
  export default PersonalAccount