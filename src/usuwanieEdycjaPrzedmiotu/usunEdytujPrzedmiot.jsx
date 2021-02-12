import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    Grid,
    MenuItem,
    FormHelperText,
    FormControl,
    Select,
    TextareaAutosize,
    InputLabel
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useForm } from "react-hook-form";
import apiClient from '../api/apiClient';
import { useParams } from 'react-router-dom';
import AuthService from '../api/auth';


const maxWidth = 240;
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#231d43',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



export default function DeleteBject() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date('1000-10-10'));
    const [selectedDate1, setSelectedDate1] = React.useState(new Date('1000-10-16'));
    const { przedmiotid } = useParams();
    const [konkretnyprzedmiot, setKonkretnyPrzedmiot] = useState();



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };
    const [data, setData] = useState();
    const [data1, setData1] = useState();
    const [nazwa, setNazwa] = useState("");
    const [miasto, setMiasto] = useState("");
    const [opis, setOpis] = useState("");
    const [dzialPrzedmiotu, Działy] = React.useState("");
    const [nazwaDzialu, setDzialu] = useState("");

    const handleOpen = (id) => {
        setKonkretnyPrzedmiot(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen2 = (id) => {
        setKonkretnyPrzedmiot(id);
        console.log("USTAWIONO KONKRETNy PRZEDMIOT", id);
        setOpen2(true);
    };

    const handleClose2 = (id) => {
        setOpen2(false);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const FormaEdycji = (przedmiot) => {
        return (<form onSubmit={handleSubmit(handleChanges)}>
            <DialogTitle id="alert-dialog-slide-title">Edycja przedmiotu</DialogTitle>
            <Grid align="center">
                <TextField id="outlined-helperText" label="Nazwa" defaultValue={data ? przedmiot?.nazwa : "waiting"} variant="outlined" name="nazwa" onChange={(e) => setNazwa(e.target.value)} />
                <TextField id="outlined-helperText" label="Miasto" defaultValue={data ? przedmiot?.miasto : "waiting"} variant="outlined" name="miasto" onChange={(e) => setMiasto(e.target.value)} />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel required id="demo-simple-select-label" defaultValue=''>Dział</InputLabel>
                    <div>
                        <Select
                            defaultValue=''
                            style={{ minWidth: 165 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChangers}
                            name="dzialPrzedmiotu"
                        >
                            {data?.map((dzialPrzedmiotu) => (
                                <MenuItem key={dzialPrzedmiotu.id} value={dzialPrzedmiotu} >{dzialPrzedmiotu.nazwaDzialu}</MenuItem>
                            ))}
                        </Select>
                    </div>
                </FormControl>
                <br />
                <TextareaAutosize
                    name="opisPrzedmiotu"
                    rowsMax={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue={przedmiot?.opisPrzedmiotu}
                    onChange={(e) => setOpis(e.target.value)}
                >
                </TextareaAutosize>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid align="center">
                    <KeyboardDatePicker
                        name="dostępnoscPoczatek"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Data udostępnienia"
                        value={przedmiot?.dostepnoscPoczatek}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid align="center">
                    <KeyboardDatePicker
                        name="dostępnoscZakonczenie"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Koniec udostępniania"
                        value={przedmiot?.dostępnoscZakonczenie}
                        onChange={handleDateChange1}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <DialogActions>
                <Button color="primary" type="submit">Zatwierdź</Button>
                <Button onClick={handleClose2} color="primary">Wyjdź bez zapisywania</Button>
            </DialogActions>
        </form>);
    };




    const FormatDate = (date) => {
        const year = date.getFullYear();
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    };

    const userid = AuthService.getCurrentUser();
    console.log("userid", userid.id);
    useEffect(() => {
        const PokazywaniePrzedmioty = async () => {
            const response = await apiClient.get(`http://127.0.0.1:8000/przedmiotyy/?miasto=&nazwa=&uzytkownikUdostepniajacy=${userid.id}`);
            setData(response.data);
            console.log("RESPONSE DATA", response.data);
            return response.data;
        }
        const przedmioty = PokazywaniePrzedmioty();
    }, []);

    const EdycjaPrzedmiotu = async (form) => {
        await apiClient.put(`http://127.0.0.1:8000/changeprzedmiot/${konkretnyprzedmiot.id}`, form);
    };

    const handleChanges = (form) => {
        console.log("form nazwa", form.nazwa);
        form.nazwa = nazwa;
        console.log("form miasto", form.miasto);
        form.miasto = miasto;
        form.dzialPrzedmiotu = dzialPrzedmiotu;
        console.log("opis ", form.opis);
        form.opisPrzedmiotu = opis;
        form.dostepnoscPoczatek = FormatDate(selectedDate);
        form.dostepnoscZakonczenie = FormatDate(selectedDate1);
        console.log("czas Poczatek", form.dostepnoscPoczatek);
        console.log("form: ", form);
        console.log("submit2");
        EdycjaPrzedmiotu(form);
    };


    useEffect(() => {
        const PodglądDzialow = async () => {
            const response = await apiClient.get(`http://127.0.0.1:8000/dzialy/`);
            console.log("Odpowiedz", response.data1);
            setData1(response.data1);
            return response.data1;
        }
        const dzialy = PodglądDzialow();
    }, []);


    const handleChangers = (event) => {
        Działy(event.target.value);
    };

    const UsunieciePrzedmiotu = async (form) => {
        await apiClient.delete(`http://127.0.0.1:8000/deleteprzedmiot/${konkretnyprzedmiot.id}`, form);
    };

    const handleChangess = (form) => {
        UsunieciePrzedmiotu(form);
    };

    const { handleSubmit } = useForm(
        {
            mode: 'onSubmit',
            reValidateMode: 'onChange',
        },
    );


    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" className={classes.głownenapisy}> Nazwa </StyledTableCell>
                        <StyledTableCell align="center" className={classes.głownenapisy}>Dział</StyledTableCell>
                        <StyledTableCell align="center" className={classes.głownenapisy}>Edytuj</StyledTableCell>
                        <StyledTableCell align="center" className={classes.głownenapisy}>Usuń</StyledTableCell>
                    </TableRow>
                </TableHead>
                {data ? data.map((przedmiot) => (
                    <TableBody >
                        <StyledTableRow key={przedmiot.przedmiotid} value={przedmiot.przedmiotid}>
                            <StyledTableCell component="th" scope="row" align="center">{przedmiot.nazwa}
                            </StyledTableCell>
                            <StyledTableCell align="center">{przedmiot.dzialPrzedmiotu}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button onClick={() => handleOpen2(przedmiot)}> <EditIcon /></Button>
                                <Dialog
                                    open={open2}
                                    onClose={handleClose2}
                                    name="edit"
                                >
                                    {console.log("przedmioot", przedmiot)}
                                    {FormaEdycji(konkretnyprzedmiot)}
                                </Dialog>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button onClick={() => handleOpen(przedmiot)} ><DeleteIcon /> </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    name="delete"
                                >
                                    <DialogTitle id="alert-dialog-slide-title">Chcesz usunąć przedmiot?</DialogTitle>
                                    <DialogActions>
                                        <form onSubmit={handleSubmit(handleChangess)}>
                                            <Button type="submit">Tak</Button>
                                        </form>
                                        <Button onClick={handleClose} >Nie</Button>
                                    </DialogActions>
                                </Dialog>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                )) : "ładowanie"};
            </Table>
        </TableContainer>
    )
}