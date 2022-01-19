import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  laoderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 'calc(50% - 20px)',
    margin: 'auto',
    height: '50px',
    width: '50px',
    '& img': {
        position: 'absolute',
        height: '45px',
        width: 'auto',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
    }
  }
}));

const AdminLoader = () => {
  const classes = useStyles();

  return (
    <div className={ classes.laoderContainer }>
      <CircularProgress thickness={8.2} />
    </div>
  );
};

export default AdminLoader;
