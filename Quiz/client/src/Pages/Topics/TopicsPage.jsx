import Topics from '../../Components/Topics/Topics';
import UsersAccount from '../../Components/UserDashBoards/UsersAccount';
import React from 'react';

const TopicsPage = ({setUserUpdate,setNavParams,setLoggedIn,userSubjects}) => {
    return(
    <Topics setUserUpdate={setUserUpdate} setNavParams={setNavParams} userSubjects={userSubjects} setLoggedIn={setLoggedIn}/>
    )
}

export default TopicsPage;