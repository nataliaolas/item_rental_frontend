import { makeStyles } from '@material-ui/core/styles';

 const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {

            margin: 'auto',
            position: 'fixed',
            top: '100px',
            right: '1px'
        }
    },
    typograp: {
        textAlign: 'left',
        color: '#190423',
        height: '30px',
        textJustify: 'center',
        align: 'left'
    },
    głownenapisy: {
        fontWeight: 'bold',
        fontSize: '15px'
    }
}));



export default useStyles;
