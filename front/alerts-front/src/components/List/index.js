import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import apiE from "../../utils/apiE";

export default function List() {

    const [alerts, setAlerts] = useState([]);
    const [posts, setPosts] = useState([]);
    
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
                    <p style={{color:'black'}}>Descrição do Alerta:</p><p> {alerta.alertDescription}</p>
                    <p style={{color:'black'}}>Grupo: </p><p>{alerta.group}</p>
                    <br/>
                    </div>
                )
            }
            )

            
            function listPost(){
        
            apiE
              .get("https://my-json-server.typicode.com/brenner-sb/test-api/posts")
              .then(function(response) {
                  console.log(response.data)
                  setPosts(response.data)
              })
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });    
              
    }
            const listaPosts = posts.map((post)=>{
                return(
                    <div>
                    <p style={{color:'black'}}>Descrição do Alerta Publicado:</p><p>{post.message}</p>
                    <br/>
                    </div>
                )
            }
            )
            





    return(
        <div className="List" style={{borderRadius:'20x'}}>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary" onClick={list}>Listar Alertas Cadastrados</button>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                {
                    lista
                }
                </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary"onClick={listPost}>Listar Publicações Realizadas</button>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                {
                    listaPosts
                }
                </div>
                </div>
                
                </div>
        </div>
    )
}
