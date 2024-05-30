import React from 'react'
import {useState} from  "react";
import {signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../config/firebase'
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Auth=()=> {
    
    const [email,setEmail]=useState("");
    const [password,setpassword]=useState("");

  const history=useNavigate();
    const logIn= async()=> {
      try{

        await signInWithEmailAndPassword(auth,email,password).then(()=>{
         // alert('Login Successfull');
         alert('Login Successfull');
          history('/');
         
  
  
        })

      }catch(err){
          console.log(err);
          alert(err)
      }
      console.log(auth?.currentUser);

  }


  const resetPassword= async()=> {

   // const userEmail = window.prompt('Enter your email:');

    try{

      await sendPasswordResetEmail(auth,email).then(()=>{

        alert("Please check your email for password reset link...");


      })

    }catch(err){
        console.log(err);
        alert(err);
    }
  

}


  return (
    // <div>
    //     <h1>Login</h1>
    //     <input type="text" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
    //     <input type="password" placeholder='Enter your Password'  value={password} onChange={(e) => setpassword(e.target.value)}/>

    //     <button onClick={logIn}>Login In</button>
    //     <button onClick={resetPassword} href="">forget password</button>
        
       

    // </div>

<div className="container">
<div className="row justify-content-center mt-5">
  <div className="col-md-6">
    <div className="card">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Login</h2>
        <form >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <Button onClick={logIn} className="btn btn-primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<br />
<center>
<Button onClick={resetPassword} >Forgot Password??</Button>

<br />
<br />

<a  href="/SignUp">New user??</a>
</center>
</div>

  )
}

export default Auth