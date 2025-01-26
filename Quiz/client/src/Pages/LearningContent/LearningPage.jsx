import Learn from '../../Components/LearningContent/LearningContent';

const LearningPage = ({setNavParams,setVisible,userSubjects,setLoggedIn}) => {
    return(
        <Learn setNavParams={setNavParams} setVisible={setVisible} userSubjects={userSubjects} setLoggedIn={setLoggedIn}/>
    )
}

export default LearningPage;