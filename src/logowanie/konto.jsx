import React, { useEffect, useState } from 'react';
import { Grid, TextField, Paper, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import apiClient from '../api/apiClient';
import { useForm } from 'react-hook-form';
import { SettingsInputComposite } from '@material-ui/icons';
import useStyles from './styles';
import { useHistory, useParams } from 'react-router-dom';
import AuthService from '../api/auth';

export default function Account() {
    const classes = useStyles();
    const [first_name, setImie] = useState();
    const [last_name, setNazwisko] = useState();
    const [email, setEmail] = useState();
    const [haslo, setHaslo] = useState();
    const [username, setUsername] = useState();
    const [numerTelefonu, setNumerTelefonu] = useState();
    const [miasto, setMiasto] = useState();
    const [dataUrodzenia, setDataUrodz] = useState();
    const [data, setData] = useState();
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

    const uzytkownikid = AuthService.getCurrentUser();
    console.log("uzytkownik", uzytkownikid.id);

    const getUzytkownik = async (uzytkownikid) => {
        console.log("auth service", AuthService.getCurrentUser());
        const response = await apiClient.get(`http://127.0.0.1:8000/uzytkownik/?user=${uzytkownikid.id}`);
        console.log("response", response.data);
        return response.data;
    };

    useEffect(() => {
        async function fetchData() {
            const response = await getUzytkownik(uzytkownikid);
            console.log("RESPONSE PO AWAIT", response);
            setData(response);
            setUsername(response[0].user.username);
            setImie(response[0].user.first_name);
            setNazwisko(response[0].user.last_name);
            setEmail(response[0].user.email);
            setNumerTelefonu(response[0].numerTelefonu);
            setMiasto(response[0].miasto);
            setDataUrodz(response[0].dataUrodzenia);
            console.log("data", data ? data : "Nie ma dżemu");
            // setData(response);
            console.log("data", data ? data : "Nie ma dżemu2");
        }
        fetchData();
    }, []);

    const EdytujKonto = async (form, uzytkownikid) => {

        await apiClient.put(`http://127.0.0.1:8000/changeuzytkownik/${uzytkownikid}`, form);
    };

    const handleChange = (form) => {
        form.username = username;
        form.first_name = first_name;
        form.last_name = last_name;
        form.email = email;
        form.haslo = haslo;
        form.numerTelefonu = numerTelefonu;
        form.miasto = miasto;
        form.dataUrodzenia = dataUrodzenia;
        EdytujKonto(form, data[0].id);
    };

    return (
        <Container >
            <Grid container spacing={3}>
                <Paper className={classes.root}>
                    <Grid className={classes.napis}><Paper>Twoje Konto </Paper></Grid>
                    <form onSubmit={handleSubmit(handleChange)}>
                        <div className={classes.textfieldy}>
                            {console.log("final data", data ? data : "Nie ma dzemu 4")}
                            <TextField
                                id="standard-helperText"
                                label="Nazwa użytkownika"
                                defaultValue={data ? data[0]?.user.username : "waiting"}
                                value={username}
                                variant="outlined"
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                id="standard-helperText"
                                label="Imię"
                                defaultValue={data ? data[0]?.user.first_name : "waiting"}
                                value={first_name}
                                variant="outlined"
                                onChange={(e) => setImie(e.target.value)}
                            />
                            <TextField
                                id="standard-helperText"
                                label="Nazwisko"
                                defaultValue={data ? data[0]?.user.last_name : "waiting"}
                                value={last_name}
                                variant="outlined"
                                onChange={(e) => setNazwisko(e.target.value)}
                            />
                        </div>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="standard-helperText"
                                label="Email"
                                defaultValue={data ? data[0]?.user.email : "waiting"}
                                value={email}
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="standard-helperText"
                                label="Numer telefonu"
                                defaultValue={data ? data[0]?.numerTelefonu : "brak informacji"}
                                value={numerTelefonu}
                                variant="outlined"
                                onChange={(e) => setNumerTelefonu(e.target.value)}
                            />
                        </div>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="standard-helperText"
                                label="Miasto"
                                value={miasto}
                                defaultValue={data ? data[0]?.miasto : "waiting"}
                                variant="outlined"
                                onChange={(e) => setMiasto(e.target.value)}
                            />
                        </div>
                        <div className={classes.textfieldy}>
                            <TextField
                                id="date"
                                label="Data Urodzenia"
                                type="date"
                                value={dataUrodzenia}
                                onChange={(e) => setDataUrodz(e.target.value)}
                                defaultValue={data ? data[0]?.dataUrodzenia : "waiting"}
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