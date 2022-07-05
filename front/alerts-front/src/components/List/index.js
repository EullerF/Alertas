import React, { useState , useEffect, Fragment} from "react";
import api from "../../utils/api";
import { Box, Tabs as TabsComponent, Tab, Typography, TableRow, Table, TableBody, TableHead, TableCell } from '@material-ui/core'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete';
import { Paper } from './style'

function TabPanel (props) {
    const { children, value, index, ...other } = props
    
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={2}>{children}</Box>
      </Typography>
    )
  }
  
  TabPanel.defaultProps = {
    value: 0
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number,
    index: PropTypes.number.isRequired
  }

export default function List() {


    const [alerts, setAlerts] = useState([]);
    const [counter, setCounter] = useState(0);
    const [alertsAtivos, setAlertsAtivos] = useState([]);
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setCounter(counter + 1)
      }

    useEffect (() => {
        
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
                
    },[counter])


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
                let objgroup
                objgroup = JSON.parse(alerta.grupo)
                const tamanho = objgroup.length
                const nameGrupos = []
                let i = 0
                    while(i<tamanho)
                    {
                        nameGrupos.push(objgroup[i]['label'])
                        i=i+1
                        if(i<tamanho){
                            nameGrupos.push(' , ')
                        }
                    }
                return(
                    <TableRow key={alerta.alertDescription}>
                        
                        <TableCell>{alerta.alertDescription}</TableCell>
                        <TableCell>{nameGrupos}</TableCell>
                        {alerta.frequencia==='HR'
                        ?
                        <TableCell>{alerta.frequenciaHr} {alerta.frequencia}</TableCell>
                        :
                        <TableCell>{alerta.frequencia}</TableCell>
                        }
                        <TableCell style={{color:'#8FBC8F', fontWeight:'bold'}}>{dateI.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</TableCell>
                        <TableCell style={{color:'#CD5C5C', fontWeight:'bold'}}>{dateE.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</TableCell>
                    <TableCell>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center',padding: '2px'}}>
                    <button  className="btn btn-secondary btn-sm" style={{padding: '8px'}} type="button" onClick={() => deleteAlert(alerta.id)}>Deletar <DeleteIcon fontSize="small"/></button>
                    {alerta.status=='Inativo'
                    ?
                    <select className="btn btn-outline-secondary dropdown-toggle" 
                    style={{marginTop:'2px'}}
                    name="status" 
                    value={alerta.status} 
                    >
                        <option value="Inativo">Inativo</option>
                    </select>
                    :
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
                    }
                    </div>
                    </TableCell>
                    </TableRow>
                      
                )
            }
            )

            const listaAtiva = alertsAtivos.map((alerta)=>{
                const dateI = new Date(alerta.dateInit)
                const dateE = new Date(alerta.dateEnd)
                let objgroup
                objgroup = JSON.parse(alerta.grupo)
                const tamanho = objgroup.length
                const nameGrupos = []
                let i = 0
                    while(i<tamanho)
                    {
                        nameGrupos.push(objgroup[i]['label'])
                        i=i+1
                        if(i<tamanho){
                            nameGrupos.push(' , ')
                        }
                    }
                return(
                    <TableRow key={alerta.alertDescription}>
                        
                        <TableCell>{alerta.alertDescription}</TableCell>
                        <TableCell>{nameGrupos}</TableCell>
                        {alerta.frequencia==='HR'
                        ?
                        <TableCell>{alerta.frequenciaHr} {alerta.frequencia}</TableCell>
                        :
                        <TableCell>{alerta.frequencia}</TableCell>
                        }
                        <TableCell style={{color:'#8FBC8F', fontWeight:'bold'}}>{dateI.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</TableCell>
                        <TableCell style={{color:'#CD5C5C', fontWeight:'bold'}}>{dateE.toLocaleString('pt-br', {timezone: 'Brazil/brt'})}</TableCell>
                    <TableCell>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', padding: '2px'}}>
                    <button  className="btn btn-secondary btn-sm" style={{padding: '8px'}} type="button" onClick={() => deleteAlert(alerta.id)}>Deletar <DeleteIcon fontSize="small"/></button>
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
            <Fragment>
                <Paper>
                    <TabsComponent
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab label="Listar todas as mensagens" />
                    <Tab label="Listar mensagens ativas"  />
                    </TabsComponent>
                </Paper>
                    <TabPanel value={value} index={0}>
                
                <Paper
                style={{
                    width: '100%',
                    marginTop:'3px',
                    overflowX: 'auto'
                }}>
                {lista.length === 0
                ?
                <div></div>
                :
                <Table style={{minWidth:'600px', maxWidth:'1200px'}}>
                <TableHead>
                    <TableRow>
                    <TableCell style={{ fontWeight:'bold'}}>Descrição do Alerta:</TableCell>
                    <TableCell style={{ fontWeight:'bold'}}>Código do Grupo:</TableCell>
                    <TableCell style={{ fontWeight:'bold'}}>Frequência de divulgação:</TableCell>
                    <TableCell style={{ fontWeight:'bold'}}>Próximo envio agendado:</TableCell>
                    <TableCell style={{ fontWeight:'bold'}}>Data Final:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    lista
                }
                </TableBody>
                </Table>
                }
                </Paper>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
                        <Paper
                        style={{
                            width: '100%',
                            marginTop:'3px',
                            overflowX: 'auto'
                        }}>
                        {listaAtiva.length === 0
                        ?
                        <div></div>
                        :
                        <Table style={{minWidth:'600px', maxWidth:'1200px'}}>
                        <TableHead>
                            <TableRow>
                            <TableCell style={{ fontWeight:'bold'}}>Descrição do Alerta:</TableCell>
                            <TableCell style={{ fontWeight:'bold'}}>Código do Grupo:</TableCell>
                            <TableCell style={{ fontWeight:'bold'}}>Frequência de divulgação:</TableCell>
                            <TableCell style={{ fontWeight:'bold'}}>Próximo envio agendado:</TableCell>
                            <TableCell style={{ fontWeight:'bold'}}>Data Final:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            listaAtiva
                        }
                        </TableBody>
                        </Table>
                        }
                        </Paper>
                        </div>
                    </TabPanel>
            </Fragment>
                </div>
                
        </div>
    )
}
