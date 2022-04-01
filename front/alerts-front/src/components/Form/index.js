import React from 'react';
import Register from '../../hooks/Register';

class Form extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      alert:'',
      group:'',
      dateInit:'',
      dateEnd:'',
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
    event.preventDefault();
    const alertCreate = {
      alertDescription: event.target.alert,
      group: event.target.group,
      dateInit: event.target.dateInit,
      dateEnd: event.target.dateEnd
      }
      Register(alertCreate);
      
    alert('Seu alerta'+ alertCreate);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <label>
          <text style={{color:'black'}}>Descrição do Alerta:</text>

          <br/>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <input name="alert" type="text" value={this.state.alert} onChange={this.handleInputChange}/>
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