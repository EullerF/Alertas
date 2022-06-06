import React from "react";
import { useState, useEffect } from 'react';
import Form from "../Form";
import List from "../List";
import api from "../../utils/api";
import apiWork from "../../utils/apiWork";
require('dotenv').config()

const TOKEN_WORK = process.env.TOKEN_WORK

const CardAdmin = () => {
   
const [envia, setEnvia] = useState({
    alerta:'',
    status:false
})

const [alerts, setAlerts] = useState([]);
const [counter, setCounter] = useState(0);
useEffect (() => {
    api
              .get("http://localhost:5000/alerts/")
              .then(function(response) {
                  setAlerts(response.data)
              })
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });  
},[])

useEffect (() => {
    api
              .patch("http://localhost:5000/alerts/")
              .then(function(response) {
                
                apiWork
                    .post('https://graph.facebook.com/v11.0/me/messages?access_token='+TOKEN_WORK,{
                          "recipient": {
                              "thread_key": response.data.grupo
                          },
                          "message": {
                              "text": response.data.alertDescription,      
                          }
                      
                    }).then(function(resp){
                        console.log(resp.message_id)
                        setEnvia({
                            alerta:response.data.alertDescription,
                            status: true
                        })
                    })
                    .catch((erro)=>{
                      console.log('Erro ao enviar para o Workchat');
                      console.log(erro)
                      
                    });
                  
                  
                  
              })
              .catch((error) => {
                console.log('Nada agendado');
                setEnvia({
                    alerta:'',
                    status: false
                })
              });   
              
},[counter])

setTimeout(()=>{
    console.log(counter)
    setCounter(counter + 1);
  },15000)
  

    return(
        <div className="card" style={{borderRadius:'10px' }}>
            <div className="card-header">
            </div>
            <div className="card-body">
                <h5 className="card-title text-center">Alerts</h5>
                {envia.status===true
                ?
                <div>
                    <p className="p-3 mb-2 bg-info text-white" style={{borderRadius:'10px'}}>Enviando: {envia.alerta}</p>
                </div>
                :
                <div>
                    
                </div>
                }
            </div>

            <div className="card-footer text-muted">
            <Form></Form>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
            <List></List>
            </div>
            
            </div>
            
        </div>
    )
}
export default CardAdmin;