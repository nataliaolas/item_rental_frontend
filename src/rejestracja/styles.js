import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '30ch',
        margin: 'auto',
        position: 'relative',
        top: '110px',
      },
    },
    button: {
      backgroundColor: '#190423',
      margin: theme.spacing(2),
      color: 'white',
      fontSize: '18px'
    },
    napis:
    {
      color: '#190423',
      margin: theme.spacing(2),
      width: '25ch',
      margin: 'auto',
      fontSize: '25px',
      fontFamily: 'Open Sans',
      textAlign: 'center'
    },
    textfields: {
      textAlign: 'center'
    },
    textField: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      width: 200,
    },
  }));
 export default useStyles;