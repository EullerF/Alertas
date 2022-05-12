import React from "react";
import api from '../../utils/api';
import { useState, useEffect } from 'react';


const Form = () =>{

  const [counter,setCounter] = useState(0);
  useEffect(()=>{
  console.log(counter)
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

  function Cadastrar(event) {
    event.preventDefault();
    
    api.post("http://localhost:5000/alerts/",{
      alertDescription:alertSubmit.alertDescription,
      group:alertSubmit.group,
      dateInit:alertSubmit.dateInit,
      dateEnd:alertSubmit.dateEnd,
      frequencia:alertSubmit.frequencia,
      file:alertSubmit.file,
    })
    .then(function(response) {
        alert('Cadastrado com Sucesso')
        setCounter(counter+1);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      alert('Preencha todos os campos')
    });  
  }

    return (
      <form onSubmit={Cadastrar} enctype='multipart/form-data'  style={{display: 'flex', flexDirection: 'column'}}>
        <label>
         Descrição do Alerta:
          <br/>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <input name="alertDescription" type="text"  onChange={onChange}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', padding: '20px 20px 20px 0px'}}>
          <input name="file "type="file" onChange={onChange} />
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column'}}>
            Data Inicio
              <input name="dateInit" type="date"  onChange={onChange}/>
            Data Final
              <input name="dateEnd" type="date"  onChange={onChange}/>
          </div>

          <div style={{display: 'flex', flexDirection: 'column'}}>
              Grupo
              <input name="group" type="text"  onChange={onChange}/>
          </div>
          <div>
          <label>
          Escolha a Frequência de divulgação do alerta:
            <br/>
            <select name="frequencia"  onChange={onChange}>
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
        <button type="submit" className="btn btn-success" >Cadastrar Alerta</button>
        </div>
      </form>
    );
  }

export default Form;