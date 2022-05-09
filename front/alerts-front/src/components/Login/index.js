import React from "react";
import api from '../../utils/api';
import { useState, useEffect } from 'react';



export default function Login() {


  const userInit = {
    user:'',
    password:'',
    profile:''
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
        console.log(userAuth)
        alert('Bem vindo: '+ response.data.user)
        // Redirecionar para tela da APLICAÇÃO enviando o userAuth
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      alert('Usuário ou senha inválidos')
    });  
    }


    return (
      <form onSubmit={Login} style={{display: 'flex', flexDirection: 'column'}}>
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
    )
  }
