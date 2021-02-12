import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Grid, Paper, Button } from '@material-ui/core';
import apiClient from '../api/apiClient';
import useStyles from './styles';

export default function Registration() {
  const classes = useStyles();
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [email, setEmail] = useState("");
  const [haslo, setHaslo] = useState("");
  const [numerTelefonu, setNumer] = useState("");
  const [miasto, setMiasto] = useState("");
  const [data, setDatas] = useState("");
  const { handleSubmit } = useForm(
    {
      mode: 'onSubmit',

    }
  );

  const Rejestracja = async (form) => {
    await apiClient.post(`http://127.0.0.1:8000/uzytkownik/`, form);
  };


  const handleChange = (form) => {
    form.imie = imie;
    form.nazwisko = nazwisko;
    form.email = email;
    form.haslo = haslo;
    form.numerTelefonu = numerTelefonu;
    form.miasto = miasto;
    form.dataUrodzenia = data;
    console.log("form: ", form);
    Rejestracja(form);
    console.log("submit2");
  };
  
  return (
    <form className={classes.root} onSubmit={handleSubmit(handleChange)}>
      <Grid container  >
        <Paper>
          <div className={classes.napis}>{"Rejestracja uzytkownika"}</div>
          <div textAlign="center">
            <TextField id="standard-basic" label="Imie" name="imie" onChange={(e) => setImie(e.target.value)} />
            <TextField id="standard-basic" label="Nazwisko" name="nazwisko" onChange={(e) => setNazwisko(e.target.value)} />
            <TextField id="standard-basic" label="Email" name="email" onChange={(e) => setEmail(e.target.value)} />
            <TextField id="standard-basic" label="Haslo" name="hasło" onChange={(e) => setHaslo(e.target.value)} />
            <TextField id="standard-basic" label="NumerTelefonu" name="numerTelefonu" onChange={(e) => setNumer(e.target.value)} />
            <TextField id="standard-basic" label="Miasto" name="miasto" onChange={(e) => setMiasto(e.target.value)} />
          </div>
          <div>
            <TextField
              onChange={(e) => setDatas(e.target.value)}
              name="dataUrodzenia"
              id="dataUrodzenia"
              label="DataUrodzenia"
              type="date"
              defaultValue="2015-08-20"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <Button variant="contained" className={classes.button} type="submit"> Zarejestruj konto </Button>
          </div>
        </Paper>
      </Grid>
    </form>

  )
};