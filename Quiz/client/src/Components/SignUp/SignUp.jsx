import Reat from 'react';
import { useState } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_SIGNUP

const SignUp = () => {
    const [message,setMessage] = useState('')
    const [login,setLogin] = useState({
        email:'',
        username:'',
        password:'',
        confirmPassword:''
    })

const createUser = async(e) => {
    e.preventDefault()
    if(login.password !== login.confirmPassword){
        setMessage('Password and confirm password must match!')
        return
    }
    try{
        const response = await axios.post(backendUrl,
        login)
      
        document.location.href = '/signin'
    } catch(err){
        setMessage(err.response.data.err)
        setTimeout(() => {
            setMessage('')
            },10000)
    }
    setLogin({
        email:'',
        username:'',
        password:'',
        confirmPassword:''
    })
    }

const handleChange = (e) => {
const {name,value} = e.target;
setLogin((prevState) => ({
    ...prevState,
    [name]:value,
}))

setTimeout(() => {
setMessage('')
},10000)

}
    return(
        <div className='mt-[20vh] flex justify-center items-center'>
            <div className='w-full sm:w-96 '>
                <h1 className='text-2xl text-center mb-5'>Lets Quiz!!</h1>
                <h5 className='text-red-500 text-center mb-1'>{message}</h5>
        <form>
            <input
  onChange={handleChange}          
value={login.email}
name="email"
  type="text"
  placeholder="Email"
  className="mb-5 input input-bordered input-info w-full" />
   <input
   onChange={handleChange}
   value={login.username}
   name="username"
  type="text"
  placeholder="UserName"
  className="mb-5 input input-bordered input-info w-full" />
   <input
   onChange={handleChange}
   value={login.password}
   name='password'
  type="password"
  placeholder="Password"
  className="mb-5 input input-bordered input-info w-full" />
   <input
   onChange={handleChange}
   value={login.confirmPassword}
   name='confirmPassword'
  type="password"
  placeholder="Confirm Password"
  className="mb-5 input input-bordered input-info w-full" />
  <div className='flex items-center justify-end'>
  <div className='flex mr-10'>
        <p className='mr-3'>Already a member?</p>
        <a className='text-blue-400 hover:text-blue-800' href="/signin">Sign In</a>
        </div>
  <button onClick={createUser} className="btn btn-outline btn-info mr-5">Sign Up</button>
  </div>
        </form>
        </div>
        </div>
    )
}

export default SignUp;