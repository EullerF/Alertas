import React from "react";
import { useState, useEffect } from 'react';
import Form from "../Form";
import List from "../List";
import api from "../../utils/api";
require('dotenv').config()

const TOKEN_WORK = process.env.TOKEN_WORK

const CardAdmin = () => {
   

const [alerts, setAlerts] = useState([]);
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