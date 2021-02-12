import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    napis:
    {
        color: '#190423',
        margin: theme.spacing(4),
        width: '25ch',
        margin: 'auto',
        fontSize: '25px',
        fontFamily: 'Open Sans',
        align: 'center',

    },
    root: {
        margin: theme.spacing(2),
        margin: 'auto',
        position: 'relative',
        top: '100px',
        left: '100px',
        width: '600px',
        height: '600px'
    },
    button: {
        backgroundColor: '#190423',
        margin: theme.spacing(2),
        align: 'center',
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
    },
}));
export default useStyles;