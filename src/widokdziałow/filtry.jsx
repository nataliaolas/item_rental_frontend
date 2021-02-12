import React, { useEffect, useState } from 'react';
import {
  TextField,
  Grid,
  Paper,
  FormControl,
  Container,
  Button
} from "@material-ui/core";
import apiClient from '../api/apiClient';
import useStyles from './styles';



function Filtr(props) {
  const classes = useStyles();
  const [nazwa, setNazwa] = React.useState("");
  const [miasto, setMiasto] = React.useState("");



  const NazwaFiltr = async (nazwa) => {
    const response = await apiClient.get(`http://127.0.0.1:8000/przedmiotyy/?nazwa=${nazwa}`);
    console.log("response: ", response.data);
    props.parentCallBack(response.data);
  };

  const MiastoFiltr = async (miasto) => {
    const response = await apiClient.get(`http://127.0.0.1:8000/przedmiotyy/?miasto=${miasto}`);
    console.log("response:", response.data);
    props.parentCallBack(response.data);
  };
  const handleNazwaChange = (event) => {
    setNazwa(event.target.value);
  };
  const handleMiastoChange = (event) => {
    setMiasto(event.target.value);
  };
  return (
    <FormControl
      className={classes.paper}
    >
      <Grid className={classes.filtry}>
        <Container component="main" maxWidth="lg">
          <Grid item xs={6}>
            <TextField id="standard-search" label="Nazwa" type="search" name="nazwa"
              value={nazwa} onChange={handleNazwaChange} />
            <Button onClick={() => NazwaFiltr(nazwa)} className={classes.buttons} > Wyszukaj</Button>
          </Grid>
          <Grid item xs={6}>
            <TextField id="standard-search" label="Miasto" type="search" name="miasto"
              value={miasto} onChange={handleMiastoChange} />
            <Button onClick={() => MiastoFiltr(miasto)} className={classes.buttons}> Wyszukaj </Button>
          </Grid>
        </Container>
      </Grid>
    </FormControl>

  )
};


export default Filtr;