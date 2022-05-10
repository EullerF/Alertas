/*import React from "react";
import api from '../../utils/api';
import { useState } from 'react';
//import { useNavigate } from 'react-router';




export default function Login() {

  //let navigate = useNavigate();

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
        //navigate('../Card')
        // Redirecionar para tela da APLICAÇÃO enviando o userAuth
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      alert('Usuário ou senha inválidos')
    });  
    }



    
  }
*/