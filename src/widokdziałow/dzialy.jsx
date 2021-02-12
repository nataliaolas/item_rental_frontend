import React, { useState, useEffect, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import {
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid
} from '@material-ui/core';
import { Link } from "react-router-dom";
import apiClient from '../api/apiClient';
import useStyles from './styles';
import Filtr from "../widokdziałow/filtry";
import { useHistory, useParams } from 'react-router-dom';
import getPrzedmiot from './method';



export default function Dział() {
    const classes = useStyles();
    const { dzial_id } = useParams();
    const [data, setData] = useState();
    console.log("dzial id: ", dzial_id);
    useEffect(() => {
        const ListaPrzedmiotow = async (dzial_id) => {

            if (dzial_id !== undefined) {
                const response = await apiClient.get(`http://127.0.0.1:8000/przedmiotyy/?miasto=&nazwa=&dzialPrzedmiotu=${dzial_id}`);
                console.log("Odpowiedz", response.data);
                setData(response.data);
                return response.data;
            }
            else {
                const response = await apiClient.get(`http://127.0.0.1:8000/przedmiotyy/`);
                console.log("Odpowiedz", response.data);
                setData(response.data);
                return response.data;
            }
        }
        const przedmioty = ListaPrzedmiotow(dzial_id);

    }, [dzial_id]);



    const Filtruj = (data) => {
        setData(data);
        console.log("data: ", data);
    }


    console.log("zdjecie odpowiedzi: ", data ? data[0].zdjecie : "trollo");

    return (
        <Grid container>
            <Grid item xs={12}>
                <Filtr parentCallBack={(data) => Filtruj(data)} />
            </Grid>
            {data ? data.map((przedmiot) => (
                <Grid item xs={6} key={przedmiot.id} value={przedmiot} className={classes.root}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <img
                                className={classes.media}
                                src={data ? przedmiot.zdjecie : ""}
                                name="zdjecie"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" name="nazwa">
                                    {przedmiot.nazwa}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h4" name="miasto">
                                    {przedmiot.miasto}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h4" name="cena" fontStyle="italic">
                                    {przedmiot.cena} zł/ 24h
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" name="opisPrzedmiotu">
                                    {przedmiot.opisPrzedmiotu}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to={`/podgladPrzedmiotu/${przedmiot.id}`}>
                                <Button size="small" style={{ color: '#190423' }}>
                                    Zobacz
        </Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
            )) : "ładowanie"};
        </Grid>
    );
}