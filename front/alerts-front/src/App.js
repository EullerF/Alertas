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
    profile:'',
    auth:false,
    message:''
  }
  const [userAuth, setuserAuth] = useState(userInit);
 

  const statusLogin = (user,profile,auth,message) => {
    userAuth.user = user
    userAuth.profile = profile
    userAuth.auth = auth
    userAuth.message = message
    delay(3)
  }

  function delay(n){
    setTimeout(()=>{
      setuserAuth({...userAuth, ['message']:''});
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
      <Signin statusLogin={statusLogin}/>
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
      {userAuth.auth===true && userAuth.message==='Auth'
      ?
      <Alert severity="success" style={{padding: '20px 80px 5px 80px', marginTop:'15px'}}>
      <AlertTitle>Login realizado</AlertTitle>
      Seja bem vindo <strong>{userAuth.user}</strong>
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
      {userAuth.auth===true && userAuth.message==='Auth'
      ?
      <Alert severity="success" style={{padding: '20px 80px 5px 80px', marginTop:'15px'}}>
      <AlertTitle>Login realizado</AlertTitle>
      Seja bem vindo <strong>{userAuth.user}</strong>
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
