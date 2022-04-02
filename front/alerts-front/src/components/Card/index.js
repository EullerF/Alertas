import React, { useState } from "react";
import Form from "../Form";
import List from "../List";
import api from "../../utils/api";
import apiE from "../../utils/apiE";
const Card = () => {

    const [alerts, setAlerts] = useState([]);
    const [posts, setPosts] = useState([]);
    
    function list(){
        
            /*api
              .get("http://localhost:5000/alerts/")
              .then(function(response) {
                  console.log(response.data)
                  setAlerts(response.data)
              })
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });    
            
              const listaDiaria = alerts.map((alerta)=>{
                return(
                    console.log('teste')
                )}
              )*/
              
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
            <button  style={{padding: '5px'}} type="button" className="btn btn-outline-primary">Startar alertas agendados para publicação</button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
            <List></List>
            </div>
            
            </div>
            
        </div>
    )
}
export default Card;