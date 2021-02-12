import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 505,
        align: 'center',
        margin: theme.spacing(2),
    },
    media: {
        height: 300,
    },
    button: {
        backgroundColor: '#190423',
        margin: 'center',
        fontSize: '15px',
        color: 'white'
    },
    rot: {
        margin: 'auto',
        position: 'relative',
        top: '100px',
        left: '60px',
        width: '1000px',
        height: '400px',
        float: 'left',
    },
    media: {
        height: 200,
    },
    button: {
        backgroundColor: '#190423',
        color: 'white',
        float: 'left',
    },
    napisy: {
        color: '#190423',
        fontWeight: 'bold'
    },
    divv: {
        textAlign: 'bottom',
    },
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    media: {
        height: 300,
        width: 300,
        textAlign: 'right',
        verticalAlign: 'middle',
        borderRadius: '8px',
        border: '1px solid #ddd',
        float: 'right'
    },
    filtry: {
        margin: theme.spacing(1),
        margin: 'auto',
        position: 'relative',
        top: '60px',
        left: '350px',
        width: '500px',
        height: '250px'
    },

    buttons: {
        // margin: theme.spacing(2),
        color: '#190423',
        textAlign: 'center'
    },
    typograpg: {
        color: "#190423"
    }
}));
export default useStyles;