import React, { useState } from "react";
import Form from "../Form";
import List from "../List";
import api from "../../utils/api";
import apiE from "../../utils/apiE";
const Card = () => {

    const [alerts, setAlerts] = useState([]);
    const [post, setPost] = useState([]);
    
    function Start(){
        
            api
              .get("http://localhost:5000/alerts/")
              .then(function(response) {
                  setAlerts(response.data)
              })
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });    
            
              
              const timeElapsed = Date.now();
              const today = new Date(timeElapsed);
              const data = Date.parse(today)              

              const lista = alerts.map((alerta)=>{
                const dataI = Date.parse(alerta.dateInit)
                const dataE = Date.parse(alerta.dateEnd)
                if(dataI <= data <=dataE){
                    console.log(data)
                    setPost(alerta)
                }
                
                return(post)
                }
                )
                if(lista!=null){
                    console.log(lista)
                    const publica = lista.map((publicacoes)=>{
                        
                        apiE
                        .post("https://my-json-server.typicode.com/brenner-sb/test-api/posts",{
                            message:publicacoes.alertDescription,
                          })
                          .then(function(response) {
                              alert('Publicações enviadas')
                          })
                          .catch((err) => {
                            console.error("ops! ocorreu um erro" + err);
                          });  
                          return(0)
                }
                )
               // console.log(publica)
              
    }
}

    return(
        <div className="card" style={{borderRadius:'20x'}}>
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
export default Card;