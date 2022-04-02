
import React from "react";
import api from '../../utils/api';


class Form extends React.Component {

  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      alertDescription:'',
      group:'',
      dateInit:'',
      dateEnd:'',
      frequencia:'',
    };
    
    this.handleInputChange  = this.handleInputChange.bind(this);
  }
  

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ 
      [name]:value
    });
  }
  


  handleSubmit(event) {
    const {alertDescription,group,dateInit,dateEnd,frequencia} = this.state
    api.post("http://localhost:5000/alerts/",{
      alertDescription:alertDescription,
      group:group,
      dateInit:dateInit,
      dateEnd:dateEnd,
      frequencia:frequencia,
    })
    .then(function(response) {
        alert('Cadastrado com sucesso')
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });  
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <label>
         Descrição do Alerta:

          <br/>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <input name="alertDescription" type="text" value={this.state.alert} onChange={this.handleInputChange}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', padding: '20px 20px 20px 0px'}}>
          <input type="file" ref={this.fileInput}  />
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column'}}>
            Data Inicio
              <input name="dateInit" type="date" value={this.state.dateInit} onChange={this.handleInputChange}/>
            Data Final
              <input name="dateEnd" type="date" value={this.state.dateEnd} onChange={this.handleInputChange}/>
          </div>

          <div style={{display: 'flex', flexDirection: 'column'}}>
              Grupo
              <input name="group" type="text" value={this.state.group} onChange={this.handleInputChange}/>
          </div>
          <div>
          <label>
          Escolha a Frequência de divulgação do alerta:
            <br/>
            <select name="frequencia" value={this.state.frequencia} onChange={this.handleInputChange}>
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
}

export default Form;