import React, { useState, Fragment } from 'react';
import AdminChangePasswordBox from '../AdminChangePasswordBox';
import { Theme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { makeStyles } from '@mui/styles';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '@mui/material/Input';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import useAuth from "../../common/utils/useAuth";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme: Theme) => ({
  settingsDiv: {
    margin: '0% 10%'
  },
  labelsDiv: {
    width: '22%'
  },
  textBox: {
    width: '60%',
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '3px',
    '&.Mui-focused': {
      boxShadow: '0 0 8px rgba(0, 0, 255, 1)'
    }
  },
  inputFocused: {
    boxShadow: '0 0 8px rgba(0, 0, 255, 1)'
  },
  menuItem: {
    margin: '45px 0px'
  },
  resizeText: {
    font: '50px'
  },
  rightArrow: {
    float: 'right'
  },
  otherMenuItem: {
    margin: '20px 0px'
  },
  otherLabelsDiv: {
    width: '28.2%'
  },
  nameButton: {
    margin: '0px 5px'
  }
}));

type TransitionProps = Omit<SlideProps, 'direction'>;

const AdminProfile = () => {
  const classes = useStyles();
  const { user, updateProfile } = useAuth();

  const [expanded, setExpanded] = useState<string | false>(false);
  const [showSaveBtns, setShowSaveBtns] = useState(false);
  const [showLoaderOnSaveClick, setShowLoaderOnSaveClick] = useState(false);
  const [showResetPwdDialog, setShowResetPwdDialog] = useState(false);
  const [snackBarData, setSnackBarData] = useState({
    show: false,
    error: false,
    message: ''
  });

  const userName: string | null = user ? user['name'] : "";
  const [profileName, setProfileName] = useState(userName);

  const handleExpandChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickAway = () => {
    setShowSaveBtns(false);
  }

  const openResetPasswordDialog = (event: any) => {
    setShowResetPwdDialog(true);
  }

  const handleProfileSave = async (event: any) => {
    setShowSaveBtns(false);
    setShowLoaderOnSaveClick(true);
    await updateProfile(profileName);
    setShowLoaderOnSaveClick(false);
  }

  const handleNameChange = (event: any) => {
    setProfileName(event.target.value);
  }

  const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarData({
      show: false,
      error: false,
      message: ''
    });
  };

  const TransitionDown = (props: TransitionProps) => {
    return <Slide {...props} direction="down" />;
  }

  return (
    <Fragment>
      <div className={classes.settingsDiv}>
        <div className={classes.menuItem}>
          <div className="flex items-center" >
            <div className={classes.labelsDiv}>
              <span>Profile Photo</span>
            </div>
            <Avatar
              className="cursor-pointer"
              src="https://profile.otter.ai/AC5OZV4FEHULBAZ4/AC5OZV4FEHULEYVY"
              sx={{ width: 80, height: 80 }}
            />
          </div>
        </div>
        <div className={classes.menuItem}>
          <div className="flex items-center" >
            <div className={classes.labelsDiv}>
              <span>Name</span>
            </div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Input
                type="text"
                className={classes.textBox}
                disableUnderline={true}
                sx={{ height: 40 }}
                inputProps={{style: {fontSize: 16, padding: '10px', cursor: 'pointer'}}}
                value={profileName}
                onFocus={event => {
                  event.target.select();
                  setShowSaveBtns(true);
                }}
                onChange={handleNameChange}
              />
            </ClickAwayListener>
            { showSaveBtns ?
              (
                <div className="flex flex-between items-center mx-auto">
                  <div className={classes.nameButton}>
                    <Button
                      size="small"
                      disableRipple
                      variant="contained"
                      className="mx-auto"
                      sx={{ height: 24, width: 40}}
                      onClick={handleProfileSave}
                    >
                      Save
                    </Button>
                  </div>
                  <div className={classes.nameButton}>
                    <Button
                      size="small"
                      disableRipple
                      variant="contained"
                      className="mx-auto"
                      sx={{ height: 24, width: 40}}
                      color="inherit"
                      onClick={event => setShowSaveBtns(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : showLoaderOnSaveClick ? <CircularProgress/> : null
            }
          </div>
        </div>
        <div className={classes.menuItem}>
          <div className="flex items-center" >
            <div className={classes.labelsDiv}>
              <span>Email</span>
            </div>
            <Input
              type="text"
              className={classes.textBox}
              disableUnderline={true}
              sx={{ height: 40 }}
              inputProps={{style: {fontSize: 16, padding: '10px', cursor: 'pointer'}}}
              defaultValue={"rahul1@gmail.com"}
              disabled
            />
          </div>
        </div>
        <div className={classes.menuItem}>
          <div className="flex items-center" >
            <div className={classes.labelsDiv}>
              <span>Password</span>
            </div>
            <Input
              type="password"
              className={classes.textBox}
              disableUnderline={true}
              sx={{ height: 40 }}
              inputProps={{style: {fontSize: 16, padding: '10px', cursor: 'pointer'}}}
              defaultValue={"pass@123"}
              onClick={openResetPasswordDialog}
            />
          </div>
        </div>
        <Divider/>
        <div className={classes.otherMenuItem}>
          <div className="flex items-center" >
            <div className={classes.otherLabelsDiv}>
              <span>Manage Vocabulary</span>
            </div>
            <div className="flex items-center full-width-div justify-between">
              <Typography color="textSecondary" variant="subtitle1" component="p">Add Jargons, Abbreviations &amp; Acronyms</Typography>
              <ArrowRightTwoToneIcon/>
            </div>
          </div>
        </div>
        <Divider/>
        <div>
          <Accordion expanded={expanded === 'panel1'} onChange={handleExpandChange('panel1')} square={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{
                padding: 0
              }}
            >
              <Typography sx={{ width: '22.6%', flexShrink: 0}}>
                My Notiifications
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Email &amp; Push Notiifications</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex items-center justify-between">
                <Typography>
                  Email
                </Typography>
                <Switch defaultChecked />
              </div>
              <Divider/>
              <div className="flex items-center justify-between">
                <Typography>
                  Push
                </Typography>
                <Switch defaultChecked />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      {showResetPwdDialog && 
        (
          <AdminChangePasswordBox
            handleClose={() => setShowResetPwdDialog(false)}
            showDialog={showResetPwdDialog}
            setSnackBar={setSnackBarData}
          />
        )
      }
      <Snackbar
        open={snackBarData.show}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={TransitionDown}
      >
        { snackBarData.error ?
          (
            <Alert
              onClose={handleSnackBarClose}
              severity="error"
              sx={{ width: '100%' }}
              variant="filled"
            >
              {snackBarData.message}
            </Alert>
          ) :
          (
            <Alert
              onClose={handleSnackBarClose}
              severity="success"
              sx={{ width: '100%' }}
              variant="filled"
            >
              {snackBarData.message}
            </Alert>
          )
        }
      </Snackbar>
    </Fragment>
  );
}

export default AdminProfile;