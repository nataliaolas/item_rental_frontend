import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 605,
        align: 'center'
    },
    media: {
        height: 300,
    },
    button: {
        backgroundColor: '#190423',
        margin:'center',
        fontSize: '15px',
        color: 'white'
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Kosiarka
          </Typography>
          <Typography gutterBottom variant="h6" component="h4">
                        Częstochowa
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       Ten przedmiot jest super zajebisty serio wiem co mowie 
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div align='center'>
                    <Button variant="contained" className={classes.button}> Wypożycz przedmiot </Button>
                </div>
            </CardActions>
        </Card>
    );
}