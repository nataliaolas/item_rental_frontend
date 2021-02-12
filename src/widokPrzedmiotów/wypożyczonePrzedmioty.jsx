import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    TableBody,
    Checkbox,
    Typography
}
    from '@material-ui/core';
import apiClient from '../api/apiClient';
import useStyles from './styles';
import WidokUzytkownika from '../widokUzytkownika/widokuzytkownika';
import { widokuzytkownika } from '../common/routes';
import { Link } from "react-router-dom";
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

export default function Sharing() {
    const classes = useStyles();
    const [data, setData] = useState();

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const userid = AuthService.getCurrentUser();
    console.log("userid", userid.id);
    useEffect(() => {
        const UdostepnionePrzedmioty = async () => {
            const response = await apiClient.get(`http://127.0.0.1:8000/wypozyczenia/?uzytkownik=${userid.id}`);
            setData(response.data);
            return response.data;
        }
        const przedmioty = UdostepnionePrzedmioty();
    }, []);


    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table aria-label="customized table">
                <TableHead>
                    <Typography className={classes.typograp}>PRZEDMIOTY WYPOŻYCZONE</Typography>
                    <TableRow>
                        <StyledTableCell align="center" className={classes.głownenapisy}> Przedmiot</StyledTableCell>
                        <StyledTableCell align="right" className={classes.głownenapisy}>Udostępniający</StyledTableCell>
                        <StyledTableCell align="center" className={classes.głownenapisy}>Data wypożyczenia</StyledTableCell>
                        <StyledTableCell align="center" className={classes.głownenapisy}>Data końca wypoożyczania</StyledTableCell>
                    </TableRow>
                </TableHead>
                {data ? data.map((wypozyczenie) => (
                    <TableBody>
                        <StyledTableRow >
                            <StyledTableCell align="center" name="nazwa">{wypozyczenie.nazwa_przedmiotu}
                            </StyledTableCell>
                            <StyledTableCell align="right" name="uzytkownikUdostępniający"><Link to={`/widokuzytkownika/${wypozyczenie.uzytkownikid}`}>{wypozyczenie.imie_uzytkownika}</Link></StyledTableCell>
                            <StyledTableCell align="center" name="wypozyczeniePoczatek">{wypozyczenie.wypozyczeniePoczatek}</StyledTableCell>
                            <StyledTableCell align="center" name="wypozyczenieZakończenie">{wypozyczenie.wypozyczenieZakonczenie}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                )) : "ładowanie"};
            </Table>
        </TableContainer>
    )
}