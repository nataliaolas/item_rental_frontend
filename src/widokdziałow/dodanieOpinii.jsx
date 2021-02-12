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
import getPrzedmiot from './method';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AuthService from "../api/auth";
import { Link } from "react-router-dom";

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

export default function DodanieOpinii() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [data, setData] = React.useState();
    const [skalaZadowolenia, setZadowolenie] = useState();
    const [opis, setOpis] = useState();
    const [wypozyczeniePoczatek, setPoczatek] = useState();
    const [wypozyczenieZakonczenie, setZakonczenie] = useState();
    const history = useHistory();
    const [infoDodatkowe, setInfo] = useState("");
    const { przedmiotid } = useParams();
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

    );



    useEffect(() => {
        async function fetchData() {
            const response = await getPrzedmiot(przedmiotid);
            setData(response);
        }
        fetchData();
    }, []);



    const DodanieOpinii = async (form) => {
        await apiClient.post(`http://127.0.0.1:8000/opinie/`, form);
        console.log("form", form);
        console.log("skalazadowolenia", skalaZadowolenia);
        console.log("opis", opis);
    };

    const handleChange1 = (form) => {
        DodanieOpinii(form);
        console.log("form3", form)
    };

    console.log("zdjecie odpowiedzi: ", data ? data.zdjecie : "trollo");
    return (
        <Container >
            <Grid container spacing={3} >
                <Paper className={classes.rot}>
                    <Button color="secondary" onClick={() => history.goBack()} className={classes.back}> <ArrowBackIcon color="primary" > </ArrowBackIcon>Wróć do przeglądania </Button>
                    <Typography variant="h5" className={classes.napisy} name="nazwa">{data ? data.nazwa : "ładowanie"}</Typography>
                    <div float="right">
                        <Card className={classes.media}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={data ? data.zdjecie : "ładowanie"}
                                    title="Produkt"
                                    name="zdjecie"
                                />
                            </CardActionArea>
                        </Card>
                    </div>
                    <Typography variant="h6" className={classes.typograpg} name="miasto">{data ? data.miasto : "ładowanie"}</Typography>
                    <Typography variant="h6" className={classes.typograpg} name="cena">{data ? data.cena : "ładowanie"} zł za dzień</Typography>
                    <Typography variant="h6" className={classes.typograpg} name="dzialPrzedmiotu">{data ? data.dzialPrzedmiotu : "ładowanie"}</Typography>
                    <TextareaAutosize
                        rowsMax={5}
                        readOnly
                        value={data ? data.opisPrzedmiotu : "brak opisu"}
                        name="opisPrzedmiotu"
                    />
                    <Typography name="uzytkownikUdostepniający">{data ? data.uzytkownikUdostepniajacy : "ładowanie"} </Typography>
                    <Typography name="dostępnośćPoczątek">{data ? data.dostepnoscPoczątek : "ładowanie"} </Typography>
                    <Typography name="dostępnośćZakończenie">{data ? data.dostepnoscZakończenie : "ładowanie"} </Typography>
                    <div className={classes.divv}>
                        {console.log("AUTH USER", AuthService.getCurrentUser())}
                        {
                            (AuthService.getCurrentUser())
                                ?
                                <Button variant="outlined" className={classes.button} onClick={handleOpen}> Wypożycz przedmiot</Button>
                                :
                                <Typography>Zaloguj się, aby móc wypożyczyć przedmiot i wystawić opinie</Typography>

                        }
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
                                            name="wypozyczeniePoczatek"
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
                                            name="wypozyczenieZakonczenie"
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

                        {console.log("AUTH USER", AuthService.getCurrentUser())}
                        {
                            (AuthService.getCurrentUser())
                                ?
                                <Button variant="outlined" className={classes.button} onClick={handleOpen2}> Wystaw opinie </Button>
                                :
                                <Link to={`/logowanie`}><Button variant="outlined" className={classes.button}>Zarejestruj się </Button></Link>}
                        <Dialog
                            open={open2}
                            onClose={handleClose2}
                            name="opinia"
                        >
                            <DialogTitle id="alert-dialog-slide-title">Wystaw Opinie</DialogTitle>
                            <DialogContent>
                                <form onSubmit={(e) => handleChange1(e.target.value)}>
                                    <DialogContentText>
                                        <TextareaAutosize placeholder="Opinia" aria-label="minimum height" rowsMin={3} name="opis" value={opis}
                                            onChange={(e) => setOpis(e.target.value)} />
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <DialogContentText >
                                                Skala zadowolenia
                                        </DialogContentText>
                                            <Rating
                                                name="skalaZadowolenia"
                                                defaultValue={2}
                                                value={skalaZadowolenia}
                                                onChange={(e) => {
                                                    setZadowolenie(e.target.value);
                                                }}
                                                getLabelText={(value) => customIcons[value].label}
                                                IconContainerComponent={IconContainer}
                                            />
                                        </Box>
                                    </DialogContentText>
                                    <DialogActions>
                                        <Button onClick={handleClose2} color="primary" type="submit">Wyślij</Button>
                                    </DialogActions>
                                </form>
                            </DialogContent>

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

