import { useState,useEffect,useContext} from "react";
import { useParams } from "react-router";
import './Options.css'

const Content = ({setNavParams,setVisible,userSubjects,setLoggedIn }) => {
   const { itemId,id } = useParams()
   const currentSubject = userSubjects.filter(sub => sub._id === itemId)
   const {topics} = currentSubject[0]
   if (!currentSubject) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-bold text-gray-600">No Subject Found</h2>
      </div>
    );
  }
 
useEffect(() => {

  setLoggedIn(true)
  setVisible(false)
  setNavParams(id)
})

const pageLocation = (page) => {
  document.location.href = page;
}
   return (
      <div className="h-[100vh] flex items-center mx-auto">
     <div className=" sm:w-full md:w-[50vw] h-[60vh] sm:h-[50vh] bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-2xl text-base-content transform hover:scale-105 transition-transform duration-300 animate-fadeIn">
       <div className="text-center mb-6">
         <h1 className="text-3xl font-bold text-accent">{topics}</h1>
         <p className="text-base text-gray-400 mt-2">
           Take your knowledge to the next level!
         </p>
       </div>
       <div className="divider text-gray-600">Let’s Get Learning!</div>
       <div className=" flex grid grid-cols-2 gap-4 mt-8">
         <button onClick={() => pageLocation(`/quiz/${id}/${itemId}`)} className="btn btn-lg mr-3 btn-primary shadow-lg transform hover:scale-110 transition-transform duration-200">
           Take Quiz
         </button>
         <button onClick={() => pageLocation(`/learning/${id}/${itemId}`)} className="btn btn-lg btn-info shadow-lg transform hover:scale-110 transition-transform duration-200">
           Learning Content
         </button>
       </div>
       <div className="divider text-gray-600">Already Learned Enough?</div>
       <div className="flex justify-center">
       <button className="btn btn-lg btn-error shadow-lg transform hover:scale-110 transition-transform duration-200">
           Remove Topic
         </button>
       </div>
     </div>
     </div>
   );
 };

export default Content;