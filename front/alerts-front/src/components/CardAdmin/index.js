import React from "react";
import { useState, useEffect } from 'react';
import Form from "../Form";
import List from "../List";
import api from "../../utils/api";
import apiE from "../../utils/apiE";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);



const CardAdmin = () => {
    // Adição ao próximo agendamento
    Date.prototype.addDias = function(dias){
        this.setDate(this.getDate() + dias)
    };
    Date.prototype.addMeses = function(meses){
        this.setMonth(this.getMonth() + meses)
    };

const [alerts, setAlerts] = useState([]);
const [post, setPost] = useState([]);
const [lista, setLista] = useState([]);

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
              .get("http://localhost:5000/alerts/")
              .then(function(response) {
                  setAlerts(response.data)
              })
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });  

              var date = new Date();
              const dt = Date.parse(date) 
              
              setLista (alerts.map((alerta)=>{
                const dataI = Date.parse(alerta.dateInit)
                const dataE = Date.parse(alerta.dateEnd)
                if(dataI = date && date <= dataE){  
                    setPost(alerta)
                }
                return(post)
                }
                ))
                const valor = Start()
                if(valor = 1)
                {
                    lista.map((publicacoes)=>{
                        if(publicacoes.frequencia='diariamente')
                        {
                            publicacoes.dateInit.addDias(1)
                        }
                        if(publicacoes.frequencia='semanalmente')
                        {
                            publicacoes.dateInit.addDias(7)
                        }
                        if(publicacoes.frequencia='quinzenalmente')
                        {
                            publicacoes.dateInit.addDias(15)
                        }
                        if(publicacoes.frequencia='mensalmente')
                        {
                            publicacoes.dateInit.addMeses(1)
                        }
                        if(publicacoes.frequencia='semestralmente')
                        {
                            publicacoes.dateInit.addMeses(6)
                        }
                        
                        api.patch("http://localhost:5000/alerts/"+publicacoes.id+"/",{publicacoes})
                        // Implementar a rota que pega o ID e atualiza os dados (Nova data)
                    })

                }
},[])
  
    
    function Start(){
                if(lista!=null){
                  console.log(lista)
                    lista.map((publicacoes)=>{

                        apiE
                        .post("https://my-json-server.typicode.com/brenner-sb/test-api/posts",{
                            message:publicacoes.alertDescription,
                            group:publicacoes.group,
                          })
                          .then(function(response) {
                              return(1)
                          })
                          .catch((err) => {
                            console.error("ops! ocorreu um erro" + err);
                          });       
                }
                )
              
            }
    }

    return(
        <div className="card" style={{borderRadius:'20x' , padding:'20px'}}>
            <div className="card-header">
                
            </div>
            <div className="card-body">
                <h5 className="card-title text-center">Alerts</h5>
            </div>

            <div className="card-footer text-muted">
            <Form></Form>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
            <button  style={{padding: '5px'}} type="button" className="btn btn-outline-primary" onClick={Start}>Startar alertas agendados para publicação</button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
            <List></List>
            </div>
            
            </div>
            
        </div>
    )
}
export default CardAdmin;