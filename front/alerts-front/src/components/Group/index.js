import React from "react";
import api from '../../utils/api';
import { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Box, Tabs as TabsComponent, Tab, Typography, TableRow, Table, TableBody, TableHead, TableCell } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Paper } from './style'
import { Alert, AlertTitle } from '@material-ui/lab';


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



function Group ({attGroup}) {
  const [groups, setGroups] = useState([])
  const [value, setValue] = useState(0)
  const [counter, setCounter] = useState(0);
  const [submit,setSubmit] = useState({
    status:false,
    message:''
  });
  useEffect(()=>{
    api
                  .get("http://localhost:5000/groups/")
                  .then(function(response) {
                      setGroups(response.data)
                  })
                  .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                  }); 
  },[counter]);

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setCounter(counter + 1)
  }

  const groupinit = {
    value:'',
    label:''
  }
  const [groupSubmit, setgroupSubmit] = useState(groupinit)
  
    function onChange(event){
    const {name , value} = event.target;
    setgroupSubmit({...groupSubmit, [name]:value});
  }


  async function Cadastrar(event) {
    event.preventDefault();
    
    await api.post("http://localhost:5000/groups/",{
      value:groupSubmit.value,
      label:groupSubmit.label
    })
    .then(function(response) {
        setSubmit({
          status:true,
          message:groupSubmit.label
         })
        setgroupSubmit({
          value:'',
          label:''
        })
        attGroup()
       delay(2)
    })
    .catch((err) => { 
      setSubmit({
        status:false,
        message:err.response.data.message
       })
       delay(3)
    });  
  }

  function deleteGroup(id) {
    api
    .delete("http://localhost:5000/groups/"+id+"")
    .then(function(response) {
        setCounter(counter + 1);
        attGroup()
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    }); 
  }

  function delay(n){
    setTimeout(()=>{
      setSubmit({
      status:false,
      message:''
      })
      return
    },n*1000)
}
  
  const listaGrupos = groups.map((doc)=>{
    return(
      <TableRow key={doc.label}>
          <TableCell>{doc.label}</TableCell>
          <TableCell>{doc.value}</TableCell>
          <TableCell>
          <button  className="btn btn-secondary btn-sm" style={{padding: '8px'}} type="button" onClick={() => deleteGroup(doc.id)}>Deletar <DeleteIcon fontSize="small" /></button>
          </TableCell>
      </TableRow>
      )
  })

    return (
      
      <Fragment>
                <Paper>
                    <TabsComponent
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab label="Cadastro de Grupos" />
                    <Tab label="Listar Grupos"  />
                    </TabsComponent>
                </Paper>
                    <TabPanel value={value} index={0}>
                    <Paper
                      style={{
                          width: '100%',
                          marginTop:'3px',
                          overflowX: 'auto'
                      }}>
                        <div className="card-footer text-muted">
                        {submit.status===true && submit.message!==''
                          ?
                          <Alert severity="success">
                          <AlertTitle>Cadastrado com sucesso</AlertTitle>
                            Grupo <strong>{submit.message}</strong> adicionado.
                          </Alert>
                          :
                          <div></div>
                        }
                        {submit.status===false && submit.message!==''
                          ?
                          <Alert severity="warning">
                          <AlertTitle>Cadastro não realizado</AlertTitle>
                            Atenção <strong>{submit.message}</strong> .
                          </Alert>
                          :
                          <div></div>
                        }
                        <form onSubmit={Cadastrar} enctype='multipart/form-data'  style={{display: 'flex', flexDirection: 'column'}}>
                          <br/>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                          Digite o código do grupo:
                          <br/>
                              <input className="form-control"  name="value" type="number" value={groupSubmit.value} onChange={onChange} placeholder="Somente números"/>
                          </div>
                          <br/>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                          Digite o nome do grupo:
                              <input className="form-control"  name="label" type="text" value={groupSubmit.label} onChange={onChange}/>
                          </div>
                          <div style={{display: 'flex', flexDirection:'column', padding: '10px 80px 10px 80px'}}>
                          <button type="submit" className="btn btn-success">Cadastrar Grupo</button>
                          </div> 
                      </form>
                        </div>
                        </Paper>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <Paper
                        style={{
                            width: '100%',
                            marginTop:'3px',
                            overflowX: 'auto'
                        }}>
                      {groups.length===0
                      ?
                      <div></div>
                      :
                        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
                        
                          <Table style={{minWidth:'600px', maxWidth:'1200px'}}>
                          <TableHead>
                              <TableRow>
                              <TableCell style={{ fontWeight:'bold'}}>Descrição do Grupo:</TableCell>
                              <TableCell style={{ fontWeight:'bold'}}>Código do Grupo:</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                        {
                            listaGrupos
                        }
                          </TableBody>
                          </Table>
                          
                        </div>
                        
                      }
                      </Paper>
                    </TabPanel>
              </Fragment>
    );
  }

export default Group;