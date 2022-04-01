import api from '../utils/api'
import React, { useEffect, useState } from "react";


export default function Register(alert){
    const [state, setState] = useState();
    useEffect(() => {
        api
          .post("http://localhost:5000/alerts/",{
            alertDescription:alert.alertDescription,
            group:alert.group,
            dateInit:alert.dateInit,
            dateEnd:alert.dateEnd,
     })
          .then((response) => setState(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    
}