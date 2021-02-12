import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Grid, Paper, Button } from '@material-ui/core';
import apiClient from '../api/apiClient';
import useStyles from './styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AuthService from "../../src/api/auth";
import { useHistory } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function Registration() {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
  });
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [miasto, setMiasto] = useState();
  const [numerTelefonu, setNumer] = useState();
  const [selectedDate, setSelectedDate] = React.useState(new Date(''));
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleChange1 = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const FormatDate = (date) => {
    console.log("date", date);
    console.log("typ daty", typeof (date));
    var year = '' + date.getFullYear();
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    console.log("year + month + day", (year + '-' + month + '-' + day));
    return year + '-' + month + '-' + day;
  };


  const { handleSubmit } = useForm(
    {
      mode: 'onSubmit',
    },
  );

  const handleChange = (form) => {
    form.first_name = first_name;
    form.last_name = last_name;
    form.email = email;
    form.username = username;
    form.password = password;
    form.password2 = password2;
    form.miasto = miasto;
    form.numerTelefonu = numerTelefonu;
    console.log("Selected DAte", selectedDate);
    form.dataUrodzenia = FormatDate(selectedDate);
    console.log("Form data urodzenia po", form.dataUrodzenia);
    AuthService.register(form.email, form.username, form.password, form.password2, form.first_name, form.last_name, form.miasto,
      form.numerTelefonu, form.dataUrodzenia);
    AuthService.login(form.username, form.password);
    if (localStorage.getItem('user')) {
      return history.push("/");
    }
  }


  return (
    <form className={classes.root} onSubmit={handleSubmit(handleChange)}>
      <Grid container  >
        <Paper>
          <div className={classes.napis}>{"Rejestracja uzytkownika"}</div>
          <div textAlign="center">
            <TextField required id="standard-basic" className={classes.textField} label="Nazwa użytkownika" name="username" onChange={(e) => setUsername(e.target.value)} />
            <TextField required id="standard-basic" className={classes.textField} label="Imie" name="first_name" onChange={(e) => setFirstName(e.target.value)} />
            <TextField id="standard-basic" className={classes.textField} label="Nazwisko" name="last_name" onChange={(e) => setLastName(e.target.value)} />
            <TextField required id="standard-basic" className={classes.textField} label="Email" name="email" onChange={(e) => setEmail(e.target.value)} />
            <TextField required id="standard-basic" className={classes.textField} label="Haslo" name="password" onChange={(e) => setPassword(e.target.value)} />
            <TextField required id="standard-basic" className={classes.textField} label="Haslo" name="password2" onChange={(e) => setPassword2(e.target.value)} />
            <TextField required id="standard-basic" className={classes.textField} label="NumerTelefonu" name="numerTelefonu" onChange={(e) => setNumer(e.target.value)} />
            <TextField required id="standard-basic" className={classes.textField} label="Miasto" name="miasto" onChange={(e) => setMiasto(e.target.value)} />
          </div>
          <div>
            <TextField
              value={selectedDate}
              onChange={handleDateChange}
              name="dataUrodzenia"
              id="dataUrodzenia"
              label="DataUrodzenia"
              type="date"
              format="yyyy/mm/dd"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/mm/dd"
                margin="normal"
                id="date-picker-inline"
                label="Data Urodzenia"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider> */}
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox checked={state.checkedA} onChange={handleChange1} name="checkedA" color="default" />}
              label="Wyrażam zgodę na przetwarzanie moich danych"
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