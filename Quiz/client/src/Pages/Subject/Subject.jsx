import Content from '../../Components/ContentOptions/Options'
const SubjectPage = ({setNavParams,setVisible,userSubjects,setLoggedIn}) => {
    return(
        <Content setNavParams={setNavParams} setVisible={setVisible} setLoggedIn={setLoggedIn} userSubjects={userSubjects}/>
    )

}

export default SubjectPage;