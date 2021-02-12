import React, { useState } from 'react';
import { Grid, TextField, Paper, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import apiClient from '../api/apiClient';
import { useForm } from 'react-hook-form';
import { SettingsInputComposite } from '@material-ui/icons';
import useStyles from './styles';

export default function Account() {
    const classes = useStyles();
    const [imie, setImie] = useState();
    const [nazwisko, setNazwisko] = useState();
    const [email, setEmail] = useState();
    const [haslo, setHaslo] = useState();
    const [numerTelefonu, setNumerTelefonu] = useState();
    const [miasto, setMiasto] = useState();
    const [dataUrodzenia, setData] = useState();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const { handleSubmit } = useForm(
        {
            mode: 'onSubmit',
        },
    );
    const [selectedDate2, setSelectedDate2] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };

    const EdytujKonto = async (form) => {
        await apiClient.put(`http://127.0.0.1:8000/uzytkownik/`, form)
    };

    const handleChange = (form) => {
        form.imie = imie;
        form.nazwisko = nazwisko;
        form.email = email;
        form.haslo = haslo;
        form.numerTelefonu = numerTelefonu;
        form.miasto = miasto;
        form.dataUrodzenia = dataUrodzenia;
        EdytujKonto(form);
    };

    return (
        <Container >
            <Grid container spacing={3}>
                <Paper className={classes.root}>
                    <Grid className={classes.napis}><Paper>Twoje Konto </Paper></Grid>
                    <form onSubmit={handleSubmit(handleChange)}>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="standard-helperText"
                                label="Imię"
                                defaultValue={imie}
                                variant="outlined"
                                onChange={(e) => setImie(e.target.value)}
                            />
                            <TextField
                                id="standard-helperText"
                                label="Nazwisko"
                                defaultValue={nazwisko}
                                variant="outlined"
                                onChange={(e) => setNazwisko(e.target.value)}
                            />
                        </div>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="standard-helperText"
                                label="Email"
                                defaultValue={email}
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                id="standard-helperText"
                                label="Hasło"
                                defaultValue={haslo}
                                variant="outlined"
                                onChange={(e) => setHaslo(e.target.value)}
                            />
                        </div>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="standard-helperText"
                                label="Numer telefonu"
                                defaultValue={numerTelefonu}
                                variant="outlined"
                                onChange={(e) => setNumerTelefonu(e.target.value)}
                            />
                        </div>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="standard-helperText"
                                label="Miasto"
                                defaultValue={miasto}
                                variant="outlined"
                                onChange={(e) => setMiasto(e.target.value)}
                            />
                        </div>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="date"
                                label="Data Urodzenia"
                                type="date"
                                onChange={(e) => setData(e.target.value)}
                                defaultValue={dataUrodzenia}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div align='center'>
                            <Button variant="contained" className={classes.button} type="submit"> Zapisz zmiany </Button>
                        </div>
                    </form>
                </Paper>
            </Grid>
        </Container>
    );
};