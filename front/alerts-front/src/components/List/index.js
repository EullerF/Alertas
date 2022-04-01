import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const List = () => {
    const [alerts, setAlerts] = useState([]);
    function list(){
        
            api
              .get("http://localhost:5000/alerts/")
              .then((response) => setAlerts(response.data))
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });      
    }

    return(
        <div style={{borderRadius:'20x'}}>
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary" onClick={list}>Listar Alertas Cadastrados</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary">Listar Publicações Realizadas</button>
                </div>
                
            </div>
        </div>
    )
}
export default List;