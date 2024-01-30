import { useEffect, useState, MouseEvent } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation';
import { logOut, logIn } from '@/redux/authSlice'
import { Tab, Tabs, Box, TextField, Button, Alert, AlertTitle } from "@mui/material";
import styles from '@/styles/PersonalAccount.module.scss'
import { GET, DELETE, PUT } from '@/lib/user';
import AlertComponent from '@/components/Alert'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
type CustomAlertType = "error" | "warning" | "info" | "success";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={styles.tabs}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const PersonalAccount = () => {
  let [uid, setUid] = useState('')
  const [value, setValue] = useState(0)
  const [username, setUsername] = useState('')
  const [surname, setSurname] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('Successfully updated!')
  const [alertType, setAlertType] = useState<CustomAlertType>('success')


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch()
  const router = useRouter()



  function logOuthandler() {
    router.push('/')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    uid = ''
    dispatch(logOut({}))

  }

  async function deleteAccountHandler() {
    if (uid) {
      const statusResult = await DELETE(uid)
      if (statusResult?.message === 'SUCCESSFULLY_DELETED') {
        logOuthandler()
      }
    } else {
      console.log(`There isn't uid`)
    }

  }
  async function updateUserInfoHandler(e: MouseEvent<HTMLFormElement>) {
    e.preventDefault()
    const statusResult = await PUT(uid, username, surname, password, email)
    if (statusResult?.message === 'SUCCESSFULLY_UPDATED') {
      console.log('Успешно сохранено!')
      setAlertType('success')
      setAlertText('Successfully updated!')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000);
    } else if (statusResult?.message === 'NO_CHANGES') {
      setAlertType('info')
      setAlertText('There are no changes to update')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000);
    }
  }

  async function getDataAboutCurrentUser(username: string, type: string) {
    const statusResult = await GET(username, type)
    if (statusResult?.message === 'SUCCESSFULLY') {
      setUsername(statusResult.username)
      setPassword(statusResult.password)
      setEmail(statusResult.email)
      setSurname(statusResult.surname)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    const currentUser = localStorage.getItem('user')
    setUid(token || '')
    if (token && currentUser) {
      getDataAboutCurrentUser(currentUser, 'GET_DATA')
    }
    setAlertType('success')
    setAlertText('Login is successful')
  }, [])
  return (
    <>
      <Box className={styles.tabBox}
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <div className={styles.tabsBox}>
          <Tabs
            orientation="vertical"
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="Tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Личная информация" {...a11yProps(0)} />
            <Tab label="Мои поездки" {...a11yProps(1)} />
            <Tab label="Удалить аккаунт" {...a11yProps(2)} />
            {/* <Tab label="Выйти" onClick={logOuthandler} /> */}
          </Tabs>
          <Button variant="contained" onClick={logOuthandler} className={styles.logOutBtn}>Выйти</Button>
          
        </div>

        <TabPanel value={value} index={0}>

          <form className={styles.infoForm} onSubmit={updateUserInfoHandler}>
            {showAlert && (
              <AlertComponent
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                type={alertType}
                text={alertText}
              />
            )}
            <TextField
              className={styles.emailInput}
              margin='normal'
              required
              id="username"
              type='text'
              label="Имя"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={styles.emailInput}
              margin='normal'
              id="surname"
              type='text'
              label="Фамилия"
              variant="outlined"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
              className={styles.emailInput}
              margin='normal'
              required
              id="email"
              type='email'
              label="e-mail"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={styles.emailInput}
              margin='normal'
              required
              id="password"
              type='text'
              label="пароль"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" type='submit' className={styles.SaveBtn}>Сохранить</Button>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          У вас нет сохраненных поездок
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className={styles.deleteBntBox}>
            <p>Удаление аккаунта без возможности восстановления. Все данные будут безвозвратно удалены.</p>
            <button className={styles.deleteBnt} onClick={deleteAccountHandler}><strong><p className={styles.delLink}>Удалить аккаунт</p></strong></button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}></TabPanel>
      </Box>
    </>
  )
}

export default PersonalAccount