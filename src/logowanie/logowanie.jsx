import React,{useState} from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Paper,
  FormControl,
  TextField,
  Button
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch } from "react-redux";
import authClient from '../api/authClient';
import useStyles from './styles';
import apiClient from '../api/apiClient';
import { useForm } from "react-hook-form";
import loginAction from "../store/redux/action/loginAction";

export default function Login()
{
    const classes = useStyles();
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

    const dispatch = useDispatch();

    // const  Logowanie = async(form) =>{
    //     await apiClient.post(`http://127.0.0.1:8000/api-auth/login/`,form);
    // };

  const { handleSubmit } = useForm(
      {
          mode: 'onSubmit',
      },
  );

 
  const handleChange =  async(event) =>{
    const data = {
      username: event.username,
      password: event.password,
    };

    const response =  authClient(username,password);

    // if(localStorage.getItem("token")!== null){
    //   const userId = response.id;
    //   const userName = response.name;
    //   dispatch(loginAction(userId,userName));
    // } else "Error"
  };

    return(
        <FormControl
        className={classes.paper}
      >
        <Grid>
          <Container component="main" maxWidth="xs">
            <Paper elevation={1}>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.typog}>
                  Zaloguj się
                </Typography>
                <form noValidate onSubmit={handleSubmit(handleChange)}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    defaultValue=""
                    label="Adres email"
                    name="username"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    defaultValue=""
                    name="password"
                    label="Hasło"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.buttonx}
                  >
                   Zaloguj się
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link variant="body2">Zapomniałeś hasła?</Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Paper>
          </Container>
        </Grid>
      </FormControl>

    )
};