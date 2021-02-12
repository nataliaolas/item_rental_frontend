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
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [selectedDate1, setSelectedDate1] = React.useState(new Date('2014-08-18T21:11:54'));
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const [age, setAge] = React.useState('');

    const handleChange1 = (event) => {
        setAge(event.target.value);
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

    {/*edycja przedmiotu na formie*/ }
    const EdycjaPrzedmiotu = async (form) => {
        await apiClient.put(`http://127.0.0.1:8000/przedmiot/`, form);
    };

    const handleChanges = (form) => {
        form.nazwa = nazwa;
        form.miasto = miasto;
        form.opisPrzedmiotu = opis;
        form.dostępnośćPoczątek = FormatDate(selectedDate);
        form.dostępnośćZakończenie = FormatDate(selectedDate1);
        console.log("czas Poczatek", form.dostępnośćPoczątek);
        console.log("form: ", form);
        console.log("submit2");
        EdycjaPrzedmiotu(form);
    };

    useEffect(() => {
        const PokazywaniePrzedmioty = async () => {
            const response = await apiClient.get(`http://127.0.0.1:8000/przedmiot/`);
            setData(response.data);
            return response.data;
        }
        const przedmioty = PokazywaniePrzedmioty();
    }, []);

    useEffect(() => {
        const PodglądDzialow = async () => {
            const response = await apiClient.get(`http://127.0.0.1:8000/dzialy/`);
            console.log("Odpowiedz", response.data1);
            setData1(response.data1);
            return response.data1;
        }
        const dzialy = PodglądDzialow();
    }, []);


    const UsunieciePrzedmiotu = async (form) => {
        await apiClient.delete(`http://127.0.0.1:8000/przedmiot/`, form);
    };

    const { handleSubmit } = useForm(
        {
            mode: 'onSubmit',
            reValidateMode: 'onChange',
        },
    );
    const handleChangess = (form) => {
        UsunieciePrzedmiotu(form);
    };

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
                    <TableBody>
                        <StyledTableRow >
                            <StyledTableCell component="th" scope="row" align="center">{przedmiot.nazwa}
                            </StyledTableCell>
                            <StyledTableCell align="center">{przedmiot.dzialPrzedmiotu}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button onClick={handleOpen2}> <EditIcon /></Button>
                                <Dialog
                                    open={open2}
                                    onClose={handleClose2}
                                    name="edit"
                                >
                                    <form onSubmit={handleSubmit(handleChanges)}>
                                        <DialogTitle id="alert-dialog-slide-title">Edycja przedmiotu</DialogTitle>
                                        <Grid align="center">
                                            <TextField id="outlined-helperText" label="Nazwa" defaultValue={przedmiot.nazwa} variant="outlined" name="nazwa" />
                                            <TextField id="outlined-helperText" label="Miasto" defaultValue={przedmiot.miasto} variant="outlined" name="miasto" />
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">Dział</InputLabel>
                                                <div>
                                                    <Select
                                                        id="demo-simple-select-outlined"
                                                        onChange={handleChange1}
                                                        label="Dział"
                                                        name="dzialPrzedmiotu"
                                                        defaultValue={przedmiot.dzialPrzedmiotu}
                                                    >

                                                        {data1?.map((dzial) => (
                                                            <MenuItem>{dzial.nazwa}</MenuItem>
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
                                                defaultValue={przedmiot.opisPrzedmiotu}
                                            >
                                            </TextareaAutosize>
                                        </Grid>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid align="center">
                                                <KeyboardDatePicker
                                                    name="dostępnośćPoczątek"
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    label="Data udostępnienia"
                                                    value={przedmiot.dostępnośćPoczątek}
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
                                                    name="dostępnośćZakończenie"
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    label="Koniec udostępniania"
                                                    value={przedmiot.dostępnośćZakończenie}
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
                                    </form>
                                </Dialog>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button onClick={handleOpen} ><DeleteIcon /> </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    name="delete"
                                >
                                    <DialogTitle id="alert-dialog-slide-title">Chcesz usunąć przedmiot?</DialogTitle>
                                    <DialogActions>
                                        <form onSubmit={handleSubmit(handleChangess)}>
                                            <Button type="submit" onClick={handleChangess}>Tak</Button>
                                            <Button onClick={handleClose} >Nie</Button>
                                        </form>
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