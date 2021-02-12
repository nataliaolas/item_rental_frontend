import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import apiClient from '../api/apiClient';
import useStyles from './styles';

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

export default function Sharing1() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    const [data, setData] = useState();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        const UdostepnionePrzedmioty = async () => {
            const response = await apiClient.get(`http://127.0.0.1:8000/przedmiot/`);
            setData(response.data);
            return response.data;
        }
        const przedmioty = UdostepnionePrzedmioty();
    }, []);
    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table aria-label="customized table">
                <TableHead>
                    <Typography className={classes.typograp}>PRZEDMIOTY UDOSTĘPNIONE</Typography>
                    <TableRow>
                        <StyledTableCell align="center" className={classes.głownenapisy}> Nazwa </StyledTableCell>
                        <StyledTableCell align="right" className={classes.głownenapisy}>Dział</StyledTableCell>
                        <StyledTableCell align="right" className={classes.głownenapisy}>Udostępniający</StyledTableCell>
                        <StyledTableCell align="right" className={classes.głownenapisy}>Data wypożyczenia</StyledTableCell>
                        <StyledTableCell align="right" className={classes.głownenapisy}>Data oddania</StyledTableCell>
                        <StyledTableCell align="center" className={classes.głownenapisy}>Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                {data ? data.map((przedmiot) => (
                    <TableBody>
                        <StyledTableRow >
                            <StyledTableCell align="center" name="nazwa">{przedmiot.nazwa}
                            </StyledTableCell>
                            <StyledTableCell align="right" name="dzialPrzedmiotu">{przedmiot.dzialPrzedmiotu}</StyledTableCell>
                            <StyledTableCell align="right" name="uzytkownikUdostępniający">{przedmiot.uzytkownikUdostępniający}</StyledTableCell>
                            <StyledTableCell align="right" name="dostępnośćPoczątek">{przedmiot.dostępnośćPoczątek}</StyledTableCell>
                            <StyledTableCell align="right" name="dostępnośćZakończenie">{przedmiot.dostępnośćZakończenie}</StyledTableCell>
                            <StyledTableCell align="center" name="status"><Checkbox
                                onChange={handleChange}
                                color='#190423'
                                value="Check"
                            /></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                )) : "ładowanie"};
            </Table>
        </TableContainer>
    )
}