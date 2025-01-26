import Reat from 'react';
import { useState } from 'react';
import axios from 'axios';

const SignIn = ({setLoggedIn}) => {
    const [message,setMessage] = useState('')
    const [login,setLogin] = useState({
        username:'',
        password:''
    })

  

const handleChange = (e) => {
    const {name,value} = e.target;
    setLogin((prevState) => ({
        ...prevState,
        [name]:value
    }))
}

const signIn= async(e)=> {
    e.preventDefault()
    try{
        const response = await axios.post('http://localhost:5000/signin', login)
        if(response.status === 200){
            setLoggedIn(true)
           document.location.href = `/topics/${response.data.userId}`
        }

    }catch(err){
        console.log(err)
        setMessage(err.response.data.err)
        setTimeout(() => {
        setMessage('')
        },10000)
    
    }
    setLogin({
        username:'',
        password:''
    })


}
    return(
        <div className='mt-[20vh] flex justify-center items-center'>
            <div className='w-full sm:w-96 '>
                <h1 className='text-2xl text-center mb-5'>Lets Topia!!</h1>
                <h5 className='text-lg mb-1 text-red-500 text-center'>{message}</h5>
        <form>
            <input
 onChange={handleChange}
 value={login.username}
 name='username'
  type="text"
  placeholder="Userename"
  className="mb-5 input input-bordered input-info w-full" />
   <input
   onChange={handleChange}
   value={login.password}
   name='password'
  type="password"
  placeholder="Password"
  className="mb-5 input input-bordered input-info w-full" />
  <div className='flex justify-end'>
  <button onClick={signIn} className="btn btn-outline btn-info mr-5">Sign In</button>
  </div>
        </form>
        </div>
        </div>
    )
}

export default SignIn;