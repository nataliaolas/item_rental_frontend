import React, { useState, useEffect } from 'react';
import { Grid, TextField, Paper, Button,  Typography, InputLabel,MenuItem,Select } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import apiClient from '../api/apiClient';
import { useForm } from "react-hook-form";
import useStyles from './styles';



export default function Pbject() {
    const classes = useStyles();
    const [data, setData] = useState();
    const [nazwa, setNazwa] = useState("");
    const [miasto, setMiasto] = useState("");
    const [opis, setOpis] = useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-10-18'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [selectedDate2, setSelectedDate2] = React.useState(new Date('2020-10-20'));
    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };
    const [dział, Działy] = React.useState('');

    const handleChangers = (event) => {
        Działy(event.target.value);
    };


    useEffect(() => {
        const PodglądDzialow = async () => {
            const response = await apiClient.get(`http://127.0.0.1:8000/dzialy/`);
            console.log("Odpowiedz", response.data);
            setData(response.data);
            return response.data;
        }
        const dzialy = PodglądDzialow();
    }, []);


    const DodaniePrzedmiotu = async (form) => {
        await apiClient.post(`http://127.0.0.1:8000/przedmiot/`, form);
    };

    const { handleSubmit } = useForm(
        {
            mode: 'onSubmit',
        },
    );

    const FormatDate = (date) => {

        const year = date.getFullYear();
        var month =''+(date.getMonth()+1);
        var day =''+date.getDate();

        if(month.length<2)
        {
            month = '0'+month;
        }
        if(day.length<2)
        {
            day= '0'+day;
        }
        return year+'-'+month+'-'+day;
    };


    const handleChange = (form) => {
        form.nazwa = nazwa;
        form.miasto = miasto;
        form.opisPrzedmiotu = opis;
        form.dostępnośćPoczątek = FormatDate(selectedDate);
        form.dostępnośćZakończenie = FormatDate(selectedDate2);
        console.log("czas Poczatek", form.dostępnośćPoczątek);
        console.log("form: ", form);
        DodaniePrzedmiotu(form);
        console.log("submit2");
    };

    return (
        // <Container>
        <form onSubmit={handleSubmit(handleChange)}>
            <Grid container spacing={3}>
                <Paper className={classes.root}>
                    <div className={classes.napis}>Dodanie przedmiotu</div>
                    <div className={classes.rotx}>
                        <Typography>Dodaj zdjęcie przedmiotu:
                    <input
                                accept="image/*"
                                defaultValue=''
                                className={classes.rot}
                                id="contained-button-file"
                                multiple
                                type="file"
                                backgroundColor="#190423"
                                name="zdjęcie"
                            />
                        </Typography>
                    </div>
                    <div align="center">
                        <Grid item xs={12} sm={6}>
                            <TextField required
                                id="standard-basic"
                                label="Nazwa"
                                name="nazwa"
                                value={nazwa}
                                onChange={(e) => setNazwa(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required id="standard-basic"
                                label="Miasto"
                                name="miasto"
                                defaultValue=''
                                value={miasto}
                                onChange={(e) => setMiasto(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel required id="demo-simple-select-label" defaultValue=''>Dział</InputLabel>
                            <div>
                                <Select
                                    defaultValue=''
                                    style={{ minWidth: 165 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={handleChangers}
                                >
                                    {data?.map((dzial) => (
                                        <MenuItem key={dzial.id} value={dzial.id} >{dzial.nazwa}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </Grid>
                        <div className={classes.rot}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="standard-multiline-flexible"
                                    label="Opis produktu"
                                    multiline
                                    rowsMax={4}
                                    name="opisPrzedmiotu"
                                    defaultValue=''
                                    value={opis}
                                    onChange={(e) => setOpis(e.target.value)}
                                />
                            </Grid>
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy/mm/dd"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    defaultValue=''
                                    margin="normal"
                                    name="dostępnośćZakończenie"
                                    id="date-picker-dialog"
                                    label="Data oddania"
                                    format="yyyy/mm/dd"
                                    value={selectedDate2}
                                    onChange={handleDateChange2}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div align='center'>
                        <Button variant="contained" className={classes.button} type="submit"> Dodaj przedmiot </Button>
                    </div>
                </Paper>
            </Grid>
        </form>
        // </Container>
    );
};