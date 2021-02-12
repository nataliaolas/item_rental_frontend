import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  FormControl,
  TextField,
  Button
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import useStyles from './styles';
import { connect } from "react-redux";
import AuthService from "../../src/api/auth";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const preventDefault = (event) => event.preventDefault();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { handleSubmit } = useForm(
    {
      mode: 'onSubmit',
    },
  );
  const handleChange = (form) => {
    form.username = username;
    form.password = password;
    console.log("haslo i nazwa", form);
    AuthService.login(form.username, form.password);
    console.log("CURRENT USER", AuthService.getCurrentUser());
    if (AuthService.getCurrentUser()) {
      console.log("TRUEE");
      return history.push("/");
    }
  }




  return (
    <div
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
                  id="username"
                  defaultValue=""
                  value={username}
                  label="Nazwa użytkownika"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  defaultValue=""
                  value={password}
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
                <div>
                  <Link to={`/rejestracja`}><Button>Nie masz konta? Zarejestruj się  </Button> </Link>
                </div>
              </form>
            </div>
          </Paper>
        </Container>
      </Grid>
    </div>

  )
};

const MapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(MapStateToProps, { Login })
  (Login);