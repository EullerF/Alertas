import CardAdmin from "./components/CardAdmin";
import CardUser from "./components/CardUser";
import React  from 'react';
import api from "../src/utils/api";
import { useState , useEffect } from 'react';


const App = () =>{
  const [counter,setCounter] = useState(0);
  useEffect(()=>{
  console.log(counter)
  },[counter]);

  const userInit = {
    user:'',
    password:'',
    profile:'',
    auth:false
  }
    
    const [userLogin, setuserLogin] = useState(userInit)
    const [userAuth, setuserAuth] = useState(userInit);

    function onChange(event){
      const {name , value} = event.target;
      setuserLogin({...userLogin, [name]:value});

    }
  
    function Login(event){
      event.preventDefault(); 
      
      api.post("http://localhost:5000/users/",{
      user:userLogin.user,
      password:userLogin.password,
    })
    .then(function(response) { 
        userAuth.user = response.data.user
        userAuth.profile = response.data.profile
        userAuth.auth = true
        console.log(userAuth)
        
        alert('Bem vindo: '+ response.data.user)
        setCounter(counter + 1)

    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      alert('Usuário ou senha inválidos')
    });  
    }



  return(
    <>
      {userAuth.auth===false
      ?
      <div>
      <form onSubmit={Login} style={{display: 'flex', flexDirection: 'column', padding: '80px'}}>
        <label>
            <div className="card-body">
                <h5 className="card-title text-center" style={{color:'blue'}}>Login</h5>
            </div>

          <div style={{display: 'flex', flexDirection: 'column', color:'blue'}}>
              Usuário:
              <input name="user" type="text"  onChange={onChange} />
          </div>
          <br/>
          <div style={{display: 'flex', flexDirection: 'column', color:'blue'}}>
              Senha:
              <input name="password" type="password"  onChange={onChange}/>
          </div>
        </label>
        <br />
        <div style={{display: 'flex', flexDirection:'column', padding: '10px 80px 10px 80px'}}>
        <button type="submit" className="btn btn-outline-primary">Login</button>
        </div>
      </form>
      </div>
      :
      <div>
      {userAuth.profile==='admin'
      ?
      <CardAdmin></CardAdmin>
      :
      <CardUser></CardUser>
      }
      </div>
      }
    </>
  )
}
export default App;