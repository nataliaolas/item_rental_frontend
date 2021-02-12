import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            position: 'fixed',
            top: '100px',
            right: '1px'
        }
    },
    głownenapisy: {
        fontWeight: 'bold',
        fontSize: '15px'
    }
}));


export default useStyles;
