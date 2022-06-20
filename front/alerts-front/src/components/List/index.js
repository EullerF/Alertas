import React, { useState , useEffect } from "react";
import api from "../../utils/api";
import {Container,Triangles} from "./styles";
import triangle from "./loading.png";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core'




export default function List() {

    const [loading, setLoading] = useState(false);
    const [loadingA, setLoadingA] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [counter, setCounter] = useState(0);
    const [counterRefresh, setCounterRefresh] = useState(false);
    const [counterRefreshA, setCounterRefreshA] = useState(false);
    const [alertsAtivos, setAlertsAtivos] = useState([]);

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
        
        api
                  .get("http://localhost:5000/alerts/ativos")
                  .then(function(response) {
                      setAlertsAtivos(response.data)
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

    function listAtiva (){
        setLoadingA(true)
        if(counterRefreshA==true){
            setAlertsAtivos([])
            setCounterRefreshA(false);
            setLoadingA(false)
        }
        else if (counterRefreshA==false){
        api
              .get("http://localhost:5000/alerts/ativos")
              .then(function(response) {
                  setAlertsAtivos(response.data)
                  setCounterRefreshA(true);
                  setLoadingA(false)
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

    function atualiza(newStatus,id) {
      
        const {value} = newStatus.target;
       
        api
        .patch("http://localhost:5000/alerts/"+id+"",{
            "status":value
        })
        .then(function(response) {
            setCounter(counter + 1);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        }); 
    }
            
            const lista = alerts.map((alerta)=>{
                const dateI = new Date(alerta.dateInit)
                const dateE = new Date(alerta.dateEnd)
                
                return(
                    <TableRow key={alerta.alertDescription}>
                        
                        <TableCell>{alerta.alertDescription}</TableCell>
                        <TableCell>{alerta.grupo}</TableCell>
                        <TableCell>{alerta.frequencia}</TableCell>
                        <TableCell style={{color:'#8FBC8F', fontWeight:'bold'}}>{dateI.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</TableCell>
                        <TableCell style={{color:'#CD5C5C', fontWeight:'bold'}}>{dateE.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</TableCell>
                    <TableCell>
                    {alerta.status=='Inativo'
                    ?
                    <select className="btn btn-outline-secondary dropdown-toggle" 
                    name="status" 
                    value={alerta.status} 
                    >
                        <option value="Inativo">Inativo</option>
                    </select>
                    :
                    <select className="btn btn-outline-secondary dropdown-toggle" 
                    name="status" 
                    value={alerta.status} 
                    onChange={(value)=> {
                            atualiza(value,alerta.id)
                        }}
                    >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                        <option value="Stop">Stop</option>
                    </select>
                    }
                    </TableCell>
                    </TableRow>
                      
                )
            }
            )

            const listaAtiva = alertsAtivos.map((alerta)=>{
                const dateI = new Date(alerta.dateInit)
                const dateE = new Date(alerta.dateEnd)  
                return(
                    <TableRow key={alerta.alertDescription}>
                        
                        <TableCell>{alerta.alertDescription}</TableCell>
                        <TableCell>{alerta.grupo}</TableCell>
                        <TableCell>{alerta.frequencia}</TableCell>
                        <TableCell style={{color:'#8FBC8F', fontWeight:'bold'}}>{dateI.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</TableCell>
                        <TableCell style={{color:'#CD5C5C', fontWeight:'bold'}}>{dateE.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</TableCell>
                    <TableCell>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', padding: '2px'}}>
                    <button  className="btn btn-secondary btn-sm" style={{padding: '8px'}} type="button" onClick={() => deleteAlert(alerta.id)}>Deletar</button>
                    <select className="btn btn-outline-secondary dropdown-toggle" 
                    style={{marginTop:'2px'}}
                    name="status" 
                    value={alerta.status} 
                    onChange={(value)=> {
                            atualiza(value,alerta.id)
                        }}
                    >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                        <option value="Stop">Stop</option>
                    </select>
                    </div>
                    </TableCell>
                    </TableRow>
                )
            }
            )
            

    return(
        <div className="List" style={{borderRadius:'20x'}}>
            <div className="btn-group" role="group" aria-label="Basic outlined example" style={{display: 'flex', flexDirection: 'column', padding:'5px'}} >
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary" onClick={list}>Listar todas as publicações</button>
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
                    <Paper
                style={{
                    width: '100%',
                    marginTop:'3px',
                    overflowX: 'auto'
                }}>
                <Table style={{minWidth:'650px'}}>
                <TableHead>
                    <TableRow>
                    <TableCell>Descrição do Alerta:</TableCell>
                    <TableCell>Código do Grupo:</TableCell>
                    <TableCell>Frequência de divulgação:</TableCell>
                    <TableCell>Próximo envio agendado:</TableCell>
                    <TableCell>Data Final:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    lista
                }
                </TableBody>
                </Table>
                </Paper>
                </div>
                }
                </div>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary"onClick={listAtiva}>Listar publicações ativas</button>
                {loadingA===true && listaAtiva.length === 0
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
                <Paper
                style={{
                    width: '100%',
                    marginTop:'3px',
                    overflowX: 'auto'
                }}>
                <Table style={{minWidth:'650px'}}>
                <TableHead>
                    <TableRow>
                    <TableCell>Descrição do Alerta:</TableCell>
                    <TableCell>Código do Grupo:</TableCell>
                    <TableCell>Frequência de divulgação:</TableCell>
                    <TableCell>Próximo envio agendado:</TableCell>
                    <TableCell>Data Final:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    listaAtiva
                }
                </TableBody>
                </Table>
                </Paper>
                </div>
                }
                </div>
                </div>
                
        </div>
    )
}
