import React from "react";
import api from '../../utils/api';
import { useState, useEffect } from 'react';
import { MultiSelect } from "react-multi-select-component";


const Form = () =>{
  const [groups, setGroups] = useState([])
  const [selectedG, setSelectedG] = useState([]);
  const [counter,setCounter] = useState(0);
  useEffect(()=>{
    api
                  .get("http://localhost:5000/groups/")
                  .then(function(response) {
                      setGroups(response.data)
                  })
                  .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                  }); 
  },[]);
  
  const alertInit = {
    alertDescription:'',
    group:[],
    dateInit:'',
    dateEnd:'',
    frequencia:'HR',
    file:'',
    frequenciaHr:1
  }
  const [alertSubmit, setalertSubmit] = useState(alertInit)
  
    function onChange(event){
    const {name , value} = event.target;
    setalertSubmit({...alertSubmit, [name]:value});
  }
  function onChangeG(name,value){
    setSelectedG(value)
    const StringGrupos = JSON.stringify(value,['value','label'])
    setalertSubmit({...alertSubmit, [name]:StringGrupos});
  }

  function onFileChange(event) {
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
          group:[],
          dateInit:'',
          dateEnd:'',
          frequencia:'HR',
          frequenciaHr:1,
          file:'', 
        })
        
    })
    .catch((err) => { 
      //console.log(err.response.data);
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
              <label>
              Referencia do grupo para envio do alerta:
              <br/>
                  <MultiSelect
                    name="group"
                    options={groups}
                    value={selectedG}
                    onChange={(value) => onChangeG('group',value)}
                    labelledBy="Select"
                  />
              </label>
              
          </div>
          <div>
          <label>
          Escolha a Frequência de divulgação do alerta:
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <br/>
            <select className="btn btn-outline-secondary dropdown-toggle" name="frequencia" value={alertSubmit.frequencia} onChange={onChange}>
            <option value="HR">Escolher frequência em Horas</option>
            <option value="diariamente">Diariamente</option>
            <option value="semanalmente">Semanalmente</option>
            <option value="quinzenalmente">Quinzenalmente</option>
            <option value="mensalmente">Mensalmente</option>
            <option value="semestralmente">Semestralmente</option>
          </select>
          {alertSubmit.frequencia==='HR' 
          ?
          <div style={{padding:'5px'}}>
          <select className="btn btn-outline-secondary dropdown-toggle" name="frequenciaHr" value={alertSubmit.frequenciaHr} onChange={onChange} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
          </select>
          </div>
          :
          <div></div>
          }
          </div>
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