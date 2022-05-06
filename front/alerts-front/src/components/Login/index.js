import React from "react";
import api from '../../utils/api';
import { useState, useEffect } from 'react';



export default function Login() {
  
    const [userLogin, setuserLogin] = useState({
      user:'',
      password:'',
    });
    const [userAuth, setuserAuth] = useState({
      user:'',
      password:'',
    });
  


  /*handleSubmit() {
    
    event.preventDefault();
    const {user,password} = this.state
    api.post("http://localhost:5000/alerts/",{
      user:user,
      password:password,
    })
    .then(function(response) {
        
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      alert('Preencha todos os campos')
    });  

  }*/

    return (
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <label>
            <div className="card-body">
                <h5 className="card-title text-center" style={{color:'blue'}}>Login</h5>
            </div>

          <div style={{display: 'flex', flexDirection: 'column', color:'blue'}}>
              Usuário:
              <input name="user" type="text" value={this.state.user} onChange={this.handleInputChange} />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', color:'blue'}}>
              Senha:
              <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
          </div>
        </label>
    
        <br />
        <div style={{display: 'flex', flexDirection:'column', padding: '10px 80px 10px 80px'}}>
        <button type="submit" className="btn btn-outline-primary">Login</button>
        </div>
      </form>
    );
  }
