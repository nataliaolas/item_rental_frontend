import React, { useEffect, useState } from 'react';
import {
    Grid,
    Paper,
    Button,
    Container,
    Typography,
    Box,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextareaAutosize,
    Card,
    CardActionArea,
    CardMedia
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import apiClient from '../api/apiClient';
import PodglądOpinii from '../widokdziałow/PodglądOpinii';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useStyles from './styles';
import PodgladPrzedmiotu from "./method";
const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function PBject() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [data, setData] = React.useState();
    const [infoDodatkowe, setInfo] = useState("");
    const { uzytkownikId } = useParams();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-10-18'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [selectedDate2, setSelectedDate2] = React.useState(new Date('2020-10-18'));

    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };
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

    const { handleSubmit, errors } = useForm(
        {
            mode: 'onSubmit',
        },
        console.log("Handle submit")
    );
    useEffect(() => {
        const PodgladPrzedmiotu = async (uzytkownikId) => {
            const response = await apiClient.get(`http://127.0.0.1:8000/przedmiot/${uzytkownikId}`);
            console.log("Odpowiedz", response.data);
            setData(response.data);
            return response.data;
        }
    }, []);
// //    {pobieranie danych z id }
//     useEffect(() => {
//         async function fetchData() {
//             const response = await PodgladPrzedmiotu(uzytkownikId);
//             setData(response);
//         }
//         fetchData();
//     }, []);
    {/*wypozyczenie przedmiotu na formie*/ }
    const WypozyczeniePrzedmiotu = async (form) => {
        await apiClient.post(`http://127.0.0.1:8000/wypozyczenia/`, form);
    };

    const handleChange = (form) => {
        form.informacjeDodatkowe = infoDodatkowe;
        form.dostępnośćPoczątek = FormatDate(selectedDate);
        form.dostępnośćZakończenie = FormatDate(selectedDate2);
        console.log("czas Poczatek", form.dostępnośćPoczątek);
        console.log("form: ", form);
        WypozyczeniePrzedmiotu(form);
        console.log("submit2");
    };

    {/* dodanie opinii*/ }
    const DodanieOpinii = async (form) => {
        await apiClient.post(`http://127.0.0.1:8000/opinie/`, form)
    };

    const handleChange1 = (form) => {
        DodanieOpinii(form);
    };

    
    return (
        <Container >
            <Grid container spacing={3} >
                <Paper className={classes.rot}>
                    <Typography variant="h5" className={classes.napisy} name="nazwa">{data ? data[1].nazwa : "ładowanie"}</Typography>
                    <div float="right">
                        <Card className={classes.media}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={data ? data[1].zdjęcie : "ładowanie"}
                                    title="Produkt"
                                    name="zdjęcie"
                                />
                            </CardActionArea>
                        </Card>
                    </div>
                    <Typography variant="h6" color="#190423" name="miasto">{data ? data[1].miasto : "ładowanie"}</Typography>
                    <Typography variant="h6" color="#190423" name="dzialPrzedmiotu">{data ? data[1].dzialPrzedmiotu : "ładowanie"}</Typography>
                    <TextareaAutosize
                        rowsMax={5}
                        readOnly
                        defaultValue={data ? data[1].opisPrzedmiotu : "brak opisu"}
                        name="opisPrzedmiotu"
                    />
                    <Typography name="uzytkownikUdostępniający">{data ? data[1].uzytkownikUdostępniający : "ładowanie"} </Typography>
                    <Typography name="dostępnośćPoczątek">{data ? data[1].dostępnośćPoczątek : "ładowanie"} </Typography>
                    <Typography name="dostępnośćZakończenie">{data ? data[1].dostępnośćZakończenie : "ładowanie"} </Typography>
                    <div className={classes.divv}>
                        <Button variant="outlined" className={classes.button} onClick={handleOpen}> Wypożycz przedmiot</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            name="wypozyczenie"
                        >
                            <DialogTitle id="alert-dialog-slide-title">Wypożyczenie przedmiotu</DialogTitle>
                            <form onSubmit={handleSubmit(handleChange)}>
                                <Grid align="center">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            name="dostępnośćPoczątek"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Data wypożyczenia"
                                            format="yyyy/mm/dd"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid align="center">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            name="dostępnośćZakończenie"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Data oddania"
                                            format="yyyy/mm/dd"
                                            value={selectedDate2}
                                            onChange={handleDateChange2}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <DialogContent>
                                    <DialogContentText align="center">
                                        <TextareaAutosize placeholder="Informacje dodatkowe dla wypozyczajacego" aria-label="minimum height" rowsMin={3} name="informacjeDodatkowe" onChange={(e) => setInfo(e.target.value)} />
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" type="submit">Wyślij</Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                        <Button variant="outlined" className={classes.button} onClick={handleOpen2}> Wystaw opinie </Button>
                        <Dialog
                            open={open2}
                            onClose={handleClose2}
                            name="opinia"
                        >
                            <DialogTitle id="alert-dialog-slide-title">Wystaw Opinie</DialogTitle>
                            <form onSubmit={handleSubmit(handleChange1)}>
                                <DialogContent>
                                    <DialogContentText>
                                        <TextareaAutosize placeholder="Opinia" aria-label="minimum height" rowsMin={3} name="opis" />
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <DialogContentText name="opis" >
                                                Skala zadowolenia
                                        </DialogContentText>
                                            <Rating
                                                name="skalaZadowolenia"
                                                defaultValue={2}
                                                getLabelText={(value) => customIcons[value].label}
                                                IconContainerComponent={IconContainer}
                                            />
                                        </Box>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose2} color="primary" type="submit">Wyślij</Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    </div>
                </Paper>
            </Grid>
            <Grid container spacing={2}>
                <PodglądOpinii />
            </Grid>
        </Container>
    );
}

