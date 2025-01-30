import React from 'react'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router';
import axios from 'axios'
const backendUrl = import.meta.env.VITE_SCORE_UPDATE

const Quiz = ({setVisible,setNavParams,setLoggedIn,userSubjects}) => {
    const {id,itemId} = useParams()
    const [userSelection,setUserSelection] = useState('')
    const [grade,setGrade] = useState(false)
  const [userAnswer,setUserAnswer] = useState([])
    const filtered = userSubjects.filter(sub => sub._id === itemId)
    const{answers,quiz_questions,topics} = filtered[0]
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [message,setMessage] = useState()

 

    useEffect(() => {
        setVisible(false)
        setNavParams(id)
        setLoggedIn(true)
        setQuizQuestions(quiz_questions);
        setGrade()
    },[id, setLoggedIn, setNavParams, setVisible, quiz_questions])

    const submitAndRemoveQuestion = (index) => {
      if(userSelection === ''){
        return
      }
        setQuizQuestions((prevQuestions) =>
          prevQuestions.filter((_, i) => i !== index)
        );
        setUserAnswer((prev) => [
          ...prev,
          userSelection
        ])
        setUserSelection("");
        
  
      
        
  
      };

     const handleChange = (e) => {
      const selected = e.target.value;
        setUserSelection(selected)
      }
  
const grader = () => {
  if(quizQuestions.length === 0){
  const answerKey = answers[0]
  const filtered = userAnswer.filter((a,i) => a === answerKey[i])
  const correct = filtered.length
  const percentage = correct / answerKey.length * 100
  setGrade(percentage)
  return percentage

  }
}

const submitGrade = async() => {
const caculatedGrade = grader()
  try{

    const response = await axios.put(`${backendUrl}/${itemId}`,{grade:caculatedGrade},
    {
      headers:{
        
          'Content-Type': 'application/json',
          Authorization: `Bearer ${id}`,

      }
    })
    console.log(response)
    if(response.status === 200){
      setMessage('Score saved!!')

    }

  }catch(err){
console.log(err)
if(err.status === 401){
  document.location.href = '/signin'
}
  }

}


    return(
<div className='stack mx-auto w-full'>
            {quizQuestions.map((q,i) => (
        <div key={i}  className="h-[100vh] https://quiz-topia.vercel.app/signin flex items-center ">
        <div className="  bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-2xl text-base-content transform hover:scale-105 transition-transform duration-300 animate-fadeIn">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-accent">{topics}</h1>
          </div>
          <div className="chat flex items-center justify-center chat-start">
          <div className="chat-image avatar ">
    <div className="w-20 rounded-full">
      <img
        alt="AI Robot"
        src="/images/AI-Robot-Transparent.png" />
    </div>
  </div>
 
  <div className="chat-bubble chat-bubble-primary">{q[0]}</div>


</div>
<div className=' chat chat-start flex p-5 justify-center'>
<div className="w-[67px]  mr-5">
      <img className='rounded-full'
        alt="User"
        src="/images/user.png" />
    </div>
  <div className='chat-bubble w-[300px] chat-bubble-primary'>
<select onChange={handleChange} value={userSelection || ""} className="select bg-primary text-gray-800 select-info  w-full max-w-xs">
  <option disabled value={''}>Answer Options</option>
  {quizQuestions[0].slice(1).map((answer, idx) => (
                  <option  value={answer} key={idx}>{answer}</option>
                ))}
</select>
</div>
</div>
          <div className="divider text-gray-600">Next Question!</div>
          <div className=" flex justify-center">
            <button onClick={() => submitAndRemoveQuestion(i)} className="btn btn-lg mr-3 btn-primary shadow-lg transform hover:scale-110 transition-transform duration-200">
              Submit
            </button>
          </div>
          <div className="divider text-gray-600">Having Trouble?</div>
          <div className="flex justify-center">
          <button onClick={() => document.location.href = `/learning/${id}/${itemId}`} className="btn btn-lg btn-info shadow-lg transform hover:scale-110 transition-transform duration-200">
              Learning Content
            </button>
          </div>
        </div>
        </div>
         ))}
          {quizQuestions.length === 0 && (
      <div  className="h-[100vh] flex items-center mx-auto mb-5">
      <div className=" sm:w-full md:w-[50vw]  bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-2xl text-base-content transform hover:scale-105 transition-transform duration-300 animate-fadeIn">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-accent">{topics}</h1>
          {message && (
          <h5 className='text-lg font-bold text-green-400'>{message}</h5>
          )}
          {grade && (
          <div className="divider  text-xl text-gray-600">Grade: {grade}%</div>
          )}
        </div>
     {!grade && (
        <div className="divider text-gray-600">Grade Quiz!</div>
     )}
          <div className=" flex justify-center">
            {!grade && (
            <button onClick={submitGrade} className="btn btn-lg mr-3 btn-primary shadow-lg transform hover:scale-110 transition-transform duration-200">
              Grade
            </button>
            )}

          </div>
         
      
        <div className="divider text-gray-600">Let's Master Some More Topics!</div>
        <div className="flex justify-center">
        <button onClick={() => document.location.href = `/topics/${id}`} className="btn btn-lg btn-info shadow-lg transform hover:scale-110 transition-transform duration-200">
            User Interface
          </button>
        </div>
      </div>
      </div>
      )}
    </div>
      
        
      );

} 

export default Quiz