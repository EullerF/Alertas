import React from "react";
import { useState, useEffect } from 'react';
import Form from "../Form";
import List from "../List";
import api from "../../utils/api";
import apiE from "../../utils/apiE";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);



const CardUser = () => {


    return(
        <div className="card" style={{borderRadius:'20x', padding:'20px'}}>
            <div className="card-header">
                
            </div>
            <div className="card-body">
                <h5 className="card-title text-center">Alerts</h5>
            </div>

            <div className="card-footer text-muted">
            <Form></Form>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
            </div>

            </div>
            
        </div>
    )
}
export default CardUser;