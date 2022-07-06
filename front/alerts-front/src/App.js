import CardAdmin from "./components/CardAdmin";
import CardUser from "./components/CardUser";
import Signin from "./components/Signin";
import React  from 'react';
import api from "../src/utils/api";
import apiWork from "../src/utils/apiWork";
import { useState , useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function App (){
  const [counter,setCounter] = useState(0);
  const [envia, setEnvia] = useState({
    alerta:'',
    status:false
})
const [submitLogin,setSubmitLogin] = useState({
  status:false,
  message:''
});

  useEffect (() => {
    api
              .patch("http://localhost:5000/alerts/")
              .then(function(response) {
                if(response.data.alertDescription){
                  let objgroup
                  objgroup = JSON.parse(response.data.grupo)
                  const tamanho = objgroup.length
                  let i = 0
                  while(i<tamanho)
                  {
                      const threadK=objgroup[i]['value']
                  
                apiWork
                    .post("https://graph.facebook.com/v11.0/me/messages?access_token=",{
                          "recipient": {
                              "thread_key": threadK
                          },
                          "message": {
                              "text": response.data.alertDescription,      
                          }
                      
                    }).then(function(resp){
                        console.log(resp.message_id)
                        setEnvia({
                            alerta:response.data.alertDescription,
                            status: true
                        })
                    })
                    .catch((erro)=>{
                      console.log('Erro ao enviar para o Workchat');
                      console.log(erro)
                      
                    });
                    i=i+1
                }
                }
                else{
                    setEnvia({
                        alerta:response.data.message,
                        status: true
                    })
                }
              })
              .catch((error) => {
                console.log('Nada ativo agendado');
                setEnvia({
                    alerta:'',
                    status: false
                })
              });   
              
},[counter])

setTimeout(()=>{
    console.log(counter)
    setCounter(counter + 1);
  },15000)

  const userInit = {
    user:'',
    password:'',
    profile:'',
    auth:false
  }
    
    const [userLogin, setuserLogin] = useState(userInit)
    const [userAuth, setuserAuth] = useState(userInit);

    function onChange(event){
      const {name , value} = event.target;
      setuserLogin({...userLogin, [name]:value});

    }
  
    function Login(event){
      event.preventDefault(); 
      
      api.post("http://localhost:5000/users/",{
      user:userLogin.user,
      password:userLogin.password,
    })
    .then(function(response) { 
        userAuth.user = response.data.user
        userAuth.profile = response.data.profile
        userAuth.auth = true
        console.log(userAuth)
        setCounter(counter + 1)
        setSubmitLogin({
          status:true,
          message:response.data.user
        })
        delay(2)

    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      setSubmitLogin({
        status:false,
        message:'Usuário ou senha inválidos'
      })
      delay(3)
    });  
    }

    function delay(n){
      setTimeout(()=>{
        setSubmitLogin({
        status:false,
        message:''
        })
        return
      },n*1000)
  }



  return(
    <>
      {userAuth.auth===false 
      ?
      <div>
      {envia.status===true
                ?
                <div style={{padding: '20px 80px 5px 80px'}}>
                    <p className="p-3 mb-2 bg-info text-white" style={{borderRadius:'10px'}}>Enviando: {envia.alerta}</p>
                </div>
                :
                <div>
                </div>
      }
      
      <form onSubmit={Login} style={{display: 'flex', flexDirection: 'column', padding: '80px'}}>
        <label>
            <div className="card-body">
                <h5 className="card-title text-center" style={{color:'blue'}}>Login</h5>
                {submitLogin.status===false && submitLogin.message!==''
                  ?
                  <Alert severity="warning" style={{marginTop:'5px',padding:'5px'}}>
                  <AlertTitle>Login não realizado</AlertTitle>
                  <strong>{submitLogin.message}</strong>
                  </Alert>
                  :
                  <div></div>
                }
            </div>

          <div style={{display: 'flex', flexDirection: 'column', color:'blue'}}>
              
              <input className="form-control" placeholder="Usuário" name="user" type="text"  onChange={onChange} />
          </div>
          <br/>
          <div style={{display: 'flex', flexDirection: 'column', color:'blue'}}>
              <input className="form-control" placeholder="Senha" name="password" type="password"  onChange={onChange}/>
          </div>
        </label>
        <br />
        <div style={{display: 'flex', flexDirection:'column', padding: '10px 80px 10px 80px'}}>
        <button type="submit" className="btn btn-outline-primary">Login</button>
        </div>
      </form> 
      </div>
      :
      <div>
      {userAuth.profile==='admin'
      ?
      <div>
      {envia.status===true
                ?
                <div style={{padding: '20px 80px 5px 80px'}}>
                    <p className="p-3 mb-2 bg-info text-white" style={{borderRadius:'10px'}}>Enviando: {envia.alerta}</p>
                </div>
                :
                <div>
                </div>
      }
      {submitLogin.status===true && submitLogin.message!==''
      ?
      <Alert severity="success" style={{padding: '20px 80px 5px 80px', marginTop:'15px'}}>
      <AlertTitle>Login realizado</AlertTitle>
      Seja bem vindo <strong>{submitLogin.message}</strong>
      </Alert>
      :
      <CardAdmin User={userAuth.user}/>
      }
      </div>
      :
      <div>
      {envia.status===true
                ?
                <div style={{padding: '20px 80px 5px 80px', marginTop:'15px'}}>
                    <p className="p-3 mb-2 bg-info text-white" style={{borderRadius:'10px'}}>Enviando: {envia.alerta}</p>
                </div>
                :
                <div>
                </div>
      }
      {submitLogin.status===true && submitLogin.message!==''
      ?
      <Alert severity="success" style={{padding: '20px 80px 5px 80px'}}>
      <AlertTitle>Login realizado</AlertTitle>
      Seja bem vindo <strong>{submitLogin.message}</strong>
      </Alert>
      :
      <CardUser></CardUser>
      }
      </div>
      }
      </div>
      }
    </>
  )
}
