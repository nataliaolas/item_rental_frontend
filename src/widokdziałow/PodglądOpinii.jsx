import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import apiClient from '../api/apiClient';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import List from '@material-ui/core/List';


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


export default function PodglądOpinii() {
    const classes = useStyles();
    const { przedmiotid } = useParams();
    const [data, setData] = React.useState();

    const getListaOpinii = async (przedmiotid) => {
        const response = await apiClient.get(`http://127.0.0.1:8000/opinie/?przedmiot=${przedmiotid}`);
        return response.data;
    };

    useEffect(() => {
        async function fetchData() {
            const response = await getListaOpinii(przedmiotid);
            setData(response);
        }
        fetchData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Paper className={classes.rot} elevation={3}>
                <Typography className={classes.text} variant="h6" gutterBottom>
                    Opinie użytkowników
            </Typography>
                <List>
                    {data ? data.map((opinia) => (
                        <ListItem key={opinia.id} value={opinia}>
                            <Typography>{opinia.opis}</Typography>
                            <ListItemText value={opinia.opis} name="opis" />
                            <Rating

                                name=""
                                defaultValue={opinia.skalaZadowolenia}
                                IconContainerComponent={IconContainer}
                                readOnly
                            />
                        </ListItem>

                    )) : "ładowanie"};
            </List>
            </Paper>
        </Grid>
    )
};