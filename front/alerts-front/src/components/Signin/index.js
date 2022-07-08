import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState , useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import api from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'black'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
}));



export default function SignIn({statusLogin}) {
  const classes = useStyles();

  const userInit = {
    user:'',
    password:'',
    profile:'',
    message: '',
    auth:false,
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
        statusLogin(response.data.user,response.data.profile,true,'Auth')
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      statusLogin('','',false,err.response.data.message)
      setuserAuth({...userAuth, ['auth']:false})
      setuserAuth({...userAuth, ['message']:err.response.data.message})
      delay(3)
    });  
    }

    function delay(n){
      setTimeout(()=>{
        setuserAuth({...userAuth, ['message']:''});
        return
      },n*1000)
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {userAuth.auth===false && userAuth.message!==''
                  ?
                  <Alert severity="warning" >
                  <AlertTitle>Login não realizado</AlertTitle>
                  <strong>{userAuth.message}</strong>
                  </Alert>
                  :
                  <div></div>
        }
        <form className={classes.form} onSubmit={Login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Usuário"
            name="user"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}