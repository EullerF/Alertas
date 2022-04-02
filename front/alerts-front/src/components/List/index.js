import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function List() {

    const [alerts, setAlerts] = useState([]);
    
    function list(){
        
            api
              .get("http://localhost:5000/alerts/")
              .then(function(response) {
                  console.log(response.data)
                  setAlerts(response.data)
              })
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });    
              
    }
            const lista = alerts.map((alerta)=>{
                return(
                    <div>
                    <p>Descrição do Alerta: {alerta.alertDescription}</p>
                    <p>Grupo: {alerta.group}</p>
                    </div>
                )
            }
            )

    return(
        <div className="List" style={{borderRadius:'20x'}}>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary" onClick={list}>Listar Alertas Cadastrados</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary">Listar Publicações Realizadas</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                {
                    lista
                }
                </div>
                </div>
        </div>
    )
}
