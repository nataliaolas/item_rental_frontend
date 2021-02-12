import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import apiClient from '../api/apiClient';
import { useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import getUzytkownik from '../widokdziałow/method';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



export default function WidokUzytkownika() {
  const classes = useStyles();
  const { uzytkownikid } = useParams();
  const [data, setData] = useState();
  const history = useHistory();

  useEffect(() => {
    const PodgladUzytkownika = async () => {
      const response = await apiClient.get(`http://127.0.0.1:8000/uzytkownik/1`);
      console.log("Odpowiedz", response.data);
      setData(response.data);
      return response.data;
    }
    const uzytkownik = PodgladUzytkownika();
  }, []);


  return (
    <Card className={classes.rot}>
      <Grid container>
        <Grid item xs={6}><Typography color="textSecondary" >Imie</Typography> </Grid>
        <Grid item xs={6}> <Typography variant="h5" className={classes.napisy} name="imie" color="textSecondary">{data ? data.user.first_name : "ładowanie"}</Typography> </Grid>
        <Grid item xs={6}><Typography color="textSecondary" >Nazwisko</Typography> </Grid>
        <Grid item xs={6}> <Typography variant="h5" className={classes.napisy} name="nazwisko" color="textSecondary">{data ? data.user.last_name : "ładowanie"}</Typography> </Grid>
        <Grid item xs={6}><Typography color="textSecondary" >Numer telefonu</Typography> </Grid>
        <Grid item xs={6}><Typography variant="h5" className={classes.napisy} name="numerTelefonu" color="textSecondary">{data ? data.numerTelefonu : "ładowanie"}</Typography></Grid>
        <Grid item xs={6}><Typography color="textSecondary" >E-mail</Typography> </Grid>
        <Grid item xs={6}><Typography variant="h5" className={classes.napisy} name="email" color="textSecondary">{data ? data.user.email : "ładowanie"}</Typography></Grid>
      </Grid>
      <Button color="secondary" onClick={() => history.goBack()} className={classes.back}> <ArrowBackIcon color="primary" > </ArrowBackIcon>Wróć do przeglądania </Button>
    </Card>
  );
}