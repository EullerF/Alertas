import Card from "./components/Card";
import Login from "./components/Login";
import { useState, useEffect } from 'react';
import api from "../src/utils/api";


const App = () =>{

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