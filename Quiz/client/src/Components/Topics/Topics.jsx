import React from 'react';
import {useState,useEffect} from 'react'
import { useParams } from 'react-router';
import TopicsCards from './TopicsCards';
import axios from 'axios';


const Topics = ({setNavParams,setLoggedIn,userSubjects}) => {
const [topics, setTopics] = useState([])
const {id} = useParams()

    useEffect(() => {
setLoggedIn(true)
const getTopics = async() => {
  try{
  const response = await axios.get('http://localhost:5000/api/topics')
  let filtered = response.data.filter(item => 
    !userSubjects.some(sub => item.topic === sub.topics)
);
setTopics(filtered)
  }catch(err){
    console.log(err)
    if(err.status === 401){
      document.location.href = '/signin'
  }
  }
}
getTopics()
setNavParams(id)

    },[])
  

    return(
        <>

      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 pt-10 md:grid-cols-3  xl:grid-cols-4  gap-6">
        {topics.map((card) => (
          <TopicsCards setTopics={setTopics} topics={topics} key={card.id} id={card.id} title={card.topic}/>
        ))}
      </div>

        </>
    )
}

export default Topics;