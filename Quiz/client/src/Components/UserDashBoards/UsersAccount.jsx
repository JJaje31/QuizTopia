import { Outlet, useParams } from "react-router";
import { useState, useEffect} from "react";
import axios from 'axios'




const UsersAccount = ({visible, setUserSubjects, userSubjects }) => {
    const [userInfo, setUserInfo] = useState();
    const { id } = useParams()
    

  
   

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/user', { id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${id}`,

                        }
                    })
                const { data } = await response
                setUserInfo(data.data)
                if (data.data.subjects) {
                    setUserSubjects(data.data.subjects);
                }

            } catch (err) {
                console.error(err)
                if(err.status === 401){
                    document.location.href = '/signin'
                }
            }
        }

        getUser()

    }, [setUserSubjects])

    if (!userInfo) {
       return <div>Loading user info...</div>;
    }
    const { subjects, username } = userInfo;
    
    


    return (
        <>
            <div className="flex">
                <div className={`drawer"} ${visible ? 'drawer-open' : 'drawer-close'} `}>
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-[200px] p-4 flex items-center">
                            <li className="mb-4">
                                <h2 className="text-lg font-bold">{username}</h2>
                            </li>
                            <li className="mb-4">
                                <h3 className="text-md font-semibold">Topics of Interest</h3>
                                <ul className="list-disc">
                                    {subjects.length > 0 ? (
                                        subjects.map((sub, i) => (
                                            <li key={i}>
                                                <a href={`/subject/${id}/${sub._id}`}>{sub.topics}</a>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No subjects added yet</li>
                                    )}

                                </ul>
                            </li>
                            <li>
                                <h3 className="text-md font-semibold">Quiz Scores</h3>
                                <ul className="pl-4 list-disc">
                                    {subjects.filter(subject => subject.score !== 0).length > 0 ? (
                                        subjects
                                            .filter(subject => subject.score !== 0)
                                            .map((subject, i) => (
                                                <li key={subject._id || i}>
                                                    {subject.topics}: {subject.score}
                                                    <progress className="progress progress-success" value={subject.score} max="100"></progress>
                                                </li>

                                            ))
                                    ) : (
                                        <li>No scores available</li>
                                    )}

                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <Outlet />
            </div>
        </>
        
    )
}



export default UsersAccount;
