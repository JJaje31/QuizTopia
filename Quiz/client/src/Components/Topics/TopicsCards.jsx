import axios from "axios"
import React from 'react'
import { useState } from "react"
import {useParams} from "react-router"
import LoadingModal from './LoadingModal'
const backendUrl = import.meta.env.VITE_TOPIC_CREATOR

const TopicsCards = ({setUserUpdate,setTopics,title,id,topics}) => {
  const userId = useParams()
  const [loading,setLoading] = useState(false)
  const [message, setMessage] = useState("")
  

  const addSubject = async(e) => {
    setLoading(true);
    
    try{
   const subId = e.target.dataset.id
    const subject = topics.filter(s => s.id == subId)
    const response = await axios.post(backendUrl,subject[0],
    {
      headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${userId.id}`,
      }
    })
    if(response.status === 200){
    const newTopics = topics.filter(s => s.id != subId)
    setTopics(newTopics)
    setMessage(response.data.message)
    setLoading(false)
    setUserUpdate(true)
    }
    
  }catch(err){
    console.log(err)
    setMessage("An error occurred. Please try again.");
    setLoading(false);
  }

   
  }
  
    return(
        <div  className="card bg-base-100 image-full w-full shadow-xl">
  <figure>
    <img
     src={"/images/Quiz.jpeg"}/>
  </figure>
  <div className="card-body text-center flex justify-center items-center">
    <h2 className="text-xl card-title mt-12">{title}</h2>
    <div className="card-actions justify-end">
      <button onClick={addSubject} data-id={id} className="btn btn-primary">Add Subject</button>
    </div>
  </div>
  <LoadingModal message={message} loading={loading}/>
</div>


    )
}

export default TopicsCards;