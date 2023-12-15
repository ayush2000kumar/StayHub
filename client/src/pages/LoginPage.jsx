import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[redirect, setRedirect] = useState(false);
  const {setUser}= useContext(UserContext);
  async function handelLogin(ev) {
    ev.preventDefault();
    try {
     const {data} = await axios.post('/login',{
       email,
       password,
      });
      setUser(data); 
      alert('Login Successful');
      setRedirect(true);
    } catch(e) {
      alert('Login failed');
    }
  }
  if(redirect){
    return <Navigate to ={'/'}/>
  }
  return (
    <div className="mt-4 grow flex center items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="mt-2 max-w-md mx-auto" onSubmit={handelLogin}>
          <input type="email" placeholder="Email"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />

          <input type="password" placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />

          <button className="primary">Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don't have account yet?
            <Link className='underline text-black' to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
} 
