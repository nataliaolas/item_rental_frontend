import React from 'react';
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

const messages = [
    {
        id: 1,
        secondary: "Produkt jest swietny!",
        person: "nata;ka",
    },
    {
        id: 2,
        secondary: `Miły własciciel,wspolpraca przebiegła sprawnie, super sprzet!`,
        person: "xddddd",
    },
];
function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}


export const ListaOpinii = async () => {
    await apiClient.post(`http://127.0.0.1:8000/opinie/`);
};

export default function PodglądOpinii(){
    const classes = useStyles();
    return(
        <Grid container spacing={2}>
        <Paper className={classes.rot} elevation={3}>
            <Typography className={classes.text} variant="h6" gutterBottom>
                Opinie użytkowników
            </Typography>
            {messages.map(({ secondary, person }) => (
                <React.Fragment>
                    <ListItem button>
                        <ListItemText person={person} secondary={secondary} />
                        <Rating
                            name="customized-icons"
                            defaultValue={2}
                            getLabelText={(value) => customIcons[value].label}
                            IconContainerComponent={IconContainer}
                            readOnly
                        />
                    </ListItem>
                </React.Fragment>
            ))}
        </Paper>
    </Grid>
    )
};