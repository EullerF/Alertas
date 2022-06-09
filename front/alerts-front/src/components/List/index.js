import React, { useState , useEffect } from "react";
import api from "../../utils/api";
import apiE from "../../utils/apiE";
import {Container,Triangles} from "./styles";
import triangle from "./loading.png";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function List() {

    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [counter, setCounter] = useState(0);
    const [counterRefresh, setCounterRefresh] = useState(false);


    useEffect (() => {
        if(counter!=0){
        api
                  .get("http://localhost:5000/alerts/")
                  .then(function(response) {
                      setAlerts(response.data)
                  })
                  .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                  });  
                }
    },[counter])

    
    function list(){
            setLoading(true)
            if(counterRefresh==true){
                setAlerts([])
                setCounterRefresh(false);
                setLoading(false)
            }
            else if (counterRefresh==false){
            api
              .get("http://localhost:5000/alerts/")
              .then(function(response) {
                  console.log(response.data)
                  setAlerts(response.data)
                  setLoading(false)
                  setCounterRefresh(true);
              })
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });    
            }
    }

    function deleteAlert(id) {
        api
        .delete("http://localhost:5000/alerts/"+id+"")
        .then(function(response) {
            setCounter(counter + 1);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        }); 
    }

    function atualiza(status,id) {
        api
        .patch("http://localhost:5000/alerts/"+id+"")
        .then(function(response) {
            
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        }); 
    }


            
            const lista = alerts.map((alerta)=>{
                const dateI = new Date(alerta.dateInit)
                const dateE = new Date(alerta.dateEnd)

                return(
                    <div>
                    <p style={{color:'black'}}>Descrição do Alerta:</p><p> {alerta.alertDescription}</p>
                    <p style={{color:'black'}}>Código do Grupo: </p><p>{alerta.grupo}</p>
                    <p style={{color:'black'}}>Frequência de divulgação: </p><p>{alerta.frequencia}</p>
                    <p style={{color:'#8FBC8F'}}>Próximo envio agendado: </p><p>{dateI.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</p>
                    <p style={{color:'#CD5C5C'}}>Data Final: </p><p>{dateE.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</p>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
                    <button  className="btn btn-secondary btn-sm" style={{padding: '8px'}} type="button" onClick={() => deleteAlert(alerta.id)}>Deletar</button>
                    <br/>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={alerta.status}
                        onChange={(value)=> atualiza(value,alerta.id)}
                    >
                        <FormControlLabel value="Ativo" control={<Radio />} label="Ativo" />
                        <FormControlLabel value="Pausado" control={<Radio />} label="Pausado" />
                     </RadioGroup>
                    </div>
                    <hr className="solid"/>
                    </div>   
                )
            }
            )
            




    return(
        <div className="List" style={{borderRadius:'20x'}}>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary" onClick={list}>Listar Alertas Cadastrados</button>
                {loading===true && lista.length === 0
                ?
                <Container>
                <Triangles>
                    <img src={triangle} alt="triangle1" className="triangle1" />
                    <img src={triangle} alt="triangle2" className="triangle2" />
                    <img src={triangle} alt="triangle3" className="triangle3" />
                </Triangles>
                </Container>
                :
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                {
                    lista
                }
                </div>
                }
                </div>
                </div>
        </div>
    )
}
