import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {

  const [newUser, setNewUser] = useState(false)

  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password : '',
    photo : ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
         handleResponse(res, true)  
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
        handleResponse(res, true)     
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }

  const handleSubmit = (e) => {
    
    if(newUser && user.password && user.email){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
            handleResponse(res, true)        
        })
    }

    if(!newUser && user.password && user.email){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            handleResponse(res, true)        
        })
    }

    e.preventDefault();
  }
  

  const handleResponse = ( res, redirect ) => {
    setUser(res);
    setLoggedInUser(res);  
    if(redirect){
      history.replace(from) // so that it takes you to your expected directory automatically after sign in  
    }
  }


  const handleBlur = (e) => {

    let isFieldValid = true;

    if (e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 5
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber 
    }
    if(isFieldValid){
      const userInfo = {...user} ;    
      userInfo[e.target.name] = e.target.value
      setUser(userInfo)
    }
  }

  return (
    <div style={{textAlign : 'center', paddingTop : '30px'}}>
      { 
          user.isSignedIn ? <button onClick={signOut}>Sign out</button>
          : <button onClick={googleSignIn}>Google Sign in</button>
      }
      <br/>
      <button onClick={fbSignIn}>Log In with Facebook</button>

      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own authentication</h1>
      {/* <h2>Name : {user.name}</h2>
      <h2>Email : {user.email}</h2>
      <h2>Password : {user.password}</h2> */}
      <form onSubmit={handleSubmit}>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
          <label htmlFor="newUser"> New User Sign Up </label>
          <br/>
          {newUser && <input type="text" name="name" placeholder="Your name" onBlur={handleBlur} required/>}
          <br/>
          <input type="text" name="email" placeholder="Your email here" onBlur={handleBlur} required/>
          <br/>
          <input type="password" name="password" placeholder="Your password here" onBlur={handleBlur} required/>
          <br/>
          <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color : 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color : 'green'}}>User {newUser ? 'signed up' : 'logged in'} successfully!</p>
      }

    </div>
  );
}

export default Login;
