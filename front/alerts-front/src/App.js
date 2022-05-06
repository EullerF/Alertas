import Card from "./components/Card";
import Login from "./components/Login";
import { useState, useEffect } from 'react';
import api from "../src/utils/api";


const App = () =>{
  const [userLogin, setUserLogin] = useState({
    user: '',
    password: '',
  })

/*
useEffect (() => {
            api
              .post("http://localhost:5000/users/")
              .then(function(response) {
                setUser(response.data)
              })
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });  
},[])*/

  return(
    <>
    <div style={{display: 'flex', flexDirection:'column', padding:'20px'}}>
    <Login></Login>
    
    <Card></Card>
    </div>
    </>
  )
}
export default App;