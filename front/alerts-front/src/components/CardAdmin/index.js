import React from "react";
import { useState, useEffect } from 'react';
import Form from "../Form";
import List from "../List";
import api from "../../utils/api";
import apiE from "../../utils/apiE";
import apiWork from "../../utils/apiWork";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);



const CardAdmin = () => {
   

const [alerts, setAlerts] = useState([]);
const [post, setPost] = useState([]);
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
                
                  // Publicações a serem enviadas para o WorkChat
                    console.log('NÃO DEVIA'+response.data)
                    apiWork
                    .post("",{
                          "recipient": {
                              "id": response.data.grupo
                          },
                          "message": {
                              "text": response.data.alertDescription
                          }
                      
                    }).then(function(resp){
                        console.log(resp.message_id)
                        
                    })
                    .catch((erro)=>{
                      console.log('Sem agendamentos');
                    });
                  
                  
              })
              .catch((error) => {
                console.error("ops! ocorreu um erro" + error);
              });   
              
              
 

},[counter])

setTimeout(()=>{
    console.log('Tempo')
    setCounter(counter + 1);
    
  },500)
  

    return(
        <div className="card" style={{borderRadius:'10px' }}>
            <div className="card-header">
            </div>
            <div className="card-body">
                <h5 className="card-title text-center">Alerts</h5>
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