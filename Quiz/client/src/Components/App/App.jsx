import { useState } from 'react'
import { BrowserRouter,Route,Routes} from 'react-router';
import './App.css'
import Nav from '../Nav/Nav'
import HomePage from '../../Pages/Home/HomePage'
import SignUpPage from '../../Pages/SignUp/SignUpPage';
import SignInPage from '../../Pages/SignIn/SignInPage';
import TopicsPage from '../../Pages/Topics/TopicsPage';
import UsersAccount from '../UserDashBoards/UsersAccount';
import SubjectPage from '../../Pages/Subject/Subject';
import QuizPage from '../../Pages/CurrentQuiz/CurrentQuizPage'
import LearningPage from '../../Pages/LearningContent/LearningPage'

function App() {
const [loggedin, setLoggedIn] = useState(false)
const [userSubjects,setUserSubjects]= useState([])
const [visible,setVisible] = useState(true)
const [navParams,setNavParams] = useState()
const [userUpdate,setUserUpdate] = useState(false)

  return (
    <>

    <BrowserRouter>
    <Nav setLoggedIn={setLoggedIn} navParams={navParams} loggedin={loggedin}/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/signin' element={<SignInPage setLoggedIn={setLoggedIn} />}/>
      <Route element={<UsersAccount userUpdate={userUpdate} userSubjects={userSubjects} visible={visible} setUserSubjects={setUserSubjects}/>}>
      <Route path='/topics/:id' element={<TopicsPage setUserUpdate={setUserUpdate} setNavParams={setNavParams} userSubjects={userSubjects} setLoggedIn={setLoggedIn}/>}/>
      <Route path="/subject/:id/:itemId" element={<SubjectPage setNavParams={setNavParams} setVisible={setVisible} userSubjects={userSubjects} setLoggedIn={setLoggedIn}/>}/>
      <Route path="/quiz/:id/:itemId" element={<QuizPage setNavParams={setNavParams} setVisible={setVisible} userSubjects={userSubjects} setLoggedIn={setLoggedIn}/>}/>
      <Route path="learning/:id/:itemId" element={<LearningPage setNavParams={setNavParams} setVisible={setVisible} userSubjects={userSubjects} setLoggedIn={setLoggedIn}/>}/>
      </Route>
    </Routes>
    </BrowserRouter>



    </>
  )
}

export default App
