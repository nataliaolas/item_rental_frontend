import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import {
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid
} from '@material-ui/core';
import { Link } from "react-router-dom";
import apiClient from '../api/apiClient';
import useStyles from './styles';


export default function Dział() {
    const classes = useStyles();
    const [data, setData] = useState();
    useEffect(() => {
        const ListaPrzedmiotow = async () => {

            const response = await apiClient.get(`http://127.0.0.1:8000/przedmiot/`);
            console.log("Odpowiedz", response.data);
            setData(response.data);
            return response.data;
        }
        const przedmioty = ListaPrzedmiotow();
    }, []);

    return (
        <Grid container>
            {data ? data.map((przedmiot) => (
                <Grid item xs={6} key={przedmiot.id} value={przedmiot}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={data ? data[0].zdjęcie : "ładowanie"}
                                name="zdjęcie"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" name="nazwa">
                                    {przedmiot.nazwa}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h4" name="miasto">
                                    {przedmiot.miasto}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" name="opisPrzedmiotu">
                                    {przedmiot.opisPrzedmiotu}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to="/podgladPrzedmiotu">
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