import React from "react";
import api from '../../utils/api';
import { useState, useEffect } from 'react';


const Form = () =>{

  const [counter,setCounter] = useState(0);
  useEffect(()=>{
    console.log(alertSubmit)
  },[counter]);
  
  const alertInit = {
    alertDescription:'',
    group:'',
    dateInit:'',
    dateEnd:'',
    frequencia:'',
    file:'',
  }
  const [alertSubmit, setalertSubmit] = useState(alertInit)

    function onChange(event){
    const {name , value} = event.target;
    setalertSubmit({...alertSubmit, [name]:value});
  }

  function onFileChange(event) {
    //setPreview(e.target.files[0])
    setalertSubmit({ ...alertSubmit, [event.target.name]: event.target.files[0] })
  }

  async function Cadastrar(event) {
    event.preventDefault();

    const formData = new FormData()

    const fileFormData =  Object.keys(alertSubmit).forEach((key) => formData.append(key, alertSubmit[key]))

    formData.append('arq', fileFormData)
    
    await api.post("http://localhost:5000/alerts/",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function(response) {
        alert('Cadastrado com Sucesso')
        setalertSubmit({
          alertDescription:'',
          group:'',
          dateInit:'',
          dateEnd:'',
          frequencia:'',
          file:'', 
        })
    })
    .catch((err) => { 
      console.log(err.response.data);
      alert('Atenção: '+err.response.data.message)
    });  
  }

    return (
      <form onSubmit={Cadastrar} enctype='multipart/form-data'  style={{display: 'flex', flexDirection: 'column'}}>
        <label>
         Descrição do Alerta:
          <br/>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <input className="form-control"  name="alertDescription" type="text" value={alertSubmit.alertDescription} onChange={onChange}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', padding: '20px 0px 20px 0px'}}>
          <input className="form-control" name='arq' type="file"  onChange={onFileChange} />
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            Data Inicio:
              <input className="btn btn-outline-secondary" name="dateInit" type="datetime-local" value={alertSubmit.dateInit} onChange={onChange}/>
            Data Final:
              <input className="btn btn-outline-secondary" name="dateEnd" type="datetime-local" value={alertSubmit.dateEnd} onChange={onChange}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', padding: '20px 0px 20px 0px'}}>
              Número de referencia do grupo:
              <input className="form-control" name="group" type="number" value={alertSubmit.group} onChange={onChange}/>
          </div>
          <div>
          <label>
          Escolha a Frequência de divulgação do alerta:
            <br/>
            <select className="btn btn-outline-secondary dropdown-toggle" name="frequencia" value={alertSubmit.frequencia} onChange={onChange}>
            <option value="diariamente">Diariamente</option>
            <option value="semanalmente">Semanalmente</option>
            <option value="quinzenalmente">Quinzenalmente</option>
            <option value="mensalmente">Mensalmente</option>
            <option value="semestralmente">Semestralmente</option>
          </select>
        </label>
          </div>

        </label>
    
        <br />
        <div style={{display: 'flex', flexDirection:'column', padding: '10px 80px 10px 80px'}}>
        <button type="submit" className="btn btn-success">Cadastrar Alerta</button>
        </div>
      </form>
    );
  }

export default Form;