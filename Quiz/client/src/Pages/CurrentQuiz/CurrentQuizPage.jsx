import Quiz from '../../Components/CurrentQuiz/CurrentQuiz';

const CurrentQuizPage = ({setNavParams,setVisible,setLoggedIn,userSubjects}) => {
    return(
        <Quiz userSubjects={userSubjects} setLoggedIn={setLoggedIn} setNavParams={setNavParams} setVisible={setVisible}/>
    )
}

export default CurrentQuizPage;