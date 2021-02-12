import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    typog: {
      textAlign: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#6a268c'
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    buttonx:{
      backgroundColor:'#6a268c'
    },
    napis:
    {
        color: '#190423',
        margin: theme.spacing(2),
        width: '25ch',
        margin: 'auto',
        fontSize: '25px',
        fontFamily: 'Open Sans',
        textAlign: 'center',
        backgroundColor: '#502664'
    },
    root: {
        margin: theme.spacing(2),
        margin: 'auto',
        position: 'relative',
        top: '100px',
        left: '100px',
        width: '600px',
        height: '500px'
    },
    button: {
        backgroundColor: '#190423',
        margin: theme.spacing(2),
        align: 'right',
        fontSize: '18px',
        color: 'white'
    },
    button1: {
        backgroundColor: '#502664',
        margin: theme.spacing(2),
        align: 'center',

    },
    glownydiv: {
        textAlign: 'center'
    },
    rot: {
        padding: theme.spacing(2),
        color: '#190423',

    },
    rotx: {
        padding: theme.spacing(2),
        color: '#190423',
        color: theme.palette.text.secondary,
    },
    textfieldy: {
        margin: theme.spacing(2),
        textAlign: 'center'
    }
  }));

export default useStyles;