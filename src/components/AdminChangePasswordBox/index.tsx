import React, { useState, forwardRef, memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Zoom from '@mui/material/Zoom';
import { Theme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { makeStyles } from '@mui/styles';
import {
  IconButton,
  Grid,
  TextField,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { API_ENDPOINT } from '../../constants';

import axios from 'axios';

interface State {
  value: string;
  show: boolean;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters"; 
  }
  if (password.search(/[a-z]/i) < 0) {
    return "Password must contain at least one lowercase letter";
  }
  if (password.search(/[A-Z]/i) < 0) {
    return "Password must contain at least one uppercase letter";
  }
  if (password.search(/[0-9]/) < 0) {
    return "Password must contain at least one number"; 
  }
  if (password.search(/[!@#$%^&*()]/i) < 0) {
    return "Password must contain at least one special character";
  }
  return "";
}

const useStyles = makeStyles((theme: Theme) => ({
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
  },
  exportDialogBox: {
    maxWidth: '556px',
    width: '556px',
    marginLeft: 'auto',
    marginRight: 'auto',
    // '@media only screen and (max-width: 1024px)': {
    //   maxWidth: 'calc(100% - 68px)',
    // },
    // '@media only screen and (max-width: 768px)': {
    //   maxWidth: 'calc(100% - 38px)',
    // },
    // '@media only screen and (max-width: 414px)': {
    //   maxWidth: '100%'
    // }
  },
  textBox: {
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '3px',
  },
  customInputLabel: {
    '& legend': {
      width: '0px'
    }
  }
}));

interface Props {
  handleClose: any;
  showDialog: boolean;
  setSnackBar: any;
}

const AdminChangePasswordDialog = ({
  handleClose,
  showDialog,
  setSnackBar }: Props) => {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState<State>({
    value: '',
    show: false,
  });

  const [newPassword, setNewPassword] = useState<State>({
    value: '',
    show: false,
  });

  const [retypePassword, setRetypePassword] = useState<State>({
    value: '',
    show: false,
  });

  const [showOldPwdErr, setShowOldPwdErr] = useState({
    error: false,
    message: ''
  });

  const [showNewPwdErr, setShowNewPwdErr] = useState({
    error: false,
    message: ''
  });

  const [showRetypePwdErr, setShowRetypePwdErr] = useState({
    error: false,
    message: ''
  });

  const [oldPasswordFocused, setOldPasswordFocused] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [retypePasswordFocused, setRetypePasswordFocused] = useState(false);

  const handleOldPasswordChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword({ ...oldPassword, [prop]: event.target.value });
    if(event.target.value === '') {
      setShowOldPwdErr({
        error: true,
        message: 'Old Password cannot be empty'
      });
    }
    else {
      setShowOldPwdErr({
        error: false,
        message: ''
      });
    }
  };

  const handleNewPasswordChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword({ ...newPassword, [prop]: event.target.value });
    if(event.target.value === '') {
      setShowNewPwdErr({
        error: true,
        message: 'New Password cannot be empty'
      });
    }
    else {
      if(oldPassword.value === event.target.value) {
        setShowNewPwdErr({
          error: true,
          message: 'New password cannot be same as old'
        });
      }
      else {
        const errPassword = validatePassword(event.target.value);
        if(errPassword === "") {
          setShowNewPwdErr({
            error: false,
            message: ''
          });    
        }
        else {
          setShowNewPwdErr({
            error: true,
            message: errPassword
          });
        }
      }
    }
  };

  const handleRetypePasswordChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetypePassword({ ...retypePassword, [prop]: event.target.value });
    if(newPassword.value === event.target.value) {
      setShowRetypePwdErr({
        error: false,
        message: ''
      });
    }
    else {
      setShowRetypePwdErr({
        error: true,
        message: 'New and confirmation password do not match'
      });
    }
  };

  const handleClickShowOldPassword = () => {
    setOldPassword({
      ...oldPassword,
      show: !oldPassword.show,
    });
  };

  const handleClickShowNewPassword = () => {
    setNewPassword({
      ...newPassword,
      show: !newPassword.show,
    });
  };

  const handleClickShowRetypePassword = () => {
    setRetypePassword({
      ...retypePassword,
      show: !retypePassword.show,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOldPwdClickAway = () => {
    if(oldPasswordFocused && oldPassword.value === '') {
      setShowOldPwdErr({
        error: true,
        message: 'Old Password cannot be empty'
      });
    }
  }

  const handleNewPwdClickAway = () => {
    if(newPasswordFocused && newPassword.value === '') {
      setShowNewPwdErr({
        error: true,
        message: 'New Password cannot be empty'
      });
    }
  }

  const handleRetypePwdClickAway = () => {
    if(retypePasswordFocused && retypePassword.value === '') {
      setShowRetypePwdErr({
        error: true,
        message: 'Retype Password cannot be empty'
      });
    }
  }

  const callResetPwdApi = async (event: any) => {
    try {
      const response: any = await axios.post(`${API_ENDPOINT}/profile/resetPassword`, {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
      });
      if(response.data.status === "ok") {
        handleClose();
        setSnackBar({
          show: true,
          error: false,
          message: 'Password reset successfully'
        });
      }
      else {
        setShowOldPwdErr({
          error: true,
          message: response.data.message
        });
      }
    }
    catch(err: any) {
      setSnackBar({
        show: true,
        error: true,
        message: 'Something went wrong.'
      });
    }
  }

  return (
    <Dialog
      open={showDialog}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex items-center justify-between">
        <Typography variant="h5" align="center">Reset Your Password</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderBottomWidth: 3 }}/>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <div className={classes.exportDialogBox}>
            <Grid container className="items-center" spacing={2}>
              <Grid item lg={4} md={4} sm={4} xs={4} className="flex justify-end">
                <Typography>Old Password</Typography>
              </Grid>
              <Grid item lg={8} md={8} sm={8} xs={8} className="flex justify-start">
                <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                  <ClickAwayListener onClickAway={handleOldPwdClickAway}>
                    <TextField
                      id="old-password"
                      type={oldPassword.show ? 'text' : 'password'}
                      value={oldPassword.value}
                      onChange={handleOldPasswordChange('value')}
                      error={showOldPwdErr.error}
                      helperText={showOldPwdErr.message}
                      className={classes.customInputLabel}
                      onFocus={event => {
                        setOldPasswordFocused(true);
                      }}
                      InputProps = {{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowOldPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {oldPassword.show ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </ClickAwayListener>
                </FormControl>
              </Grid>
            </Grid>
            <Divider light sx={{ mt: 1.5, mb: 1.5 }}/>
            <Grid container className="items-center" spacing={2}>
              <Grid item lg={4} md={4} sm={4} xs={4} className="flex justify-end">
                <Typography>New Password</Typography>
              </Grid>
              <Grid item lg={8} md={8} sm={8} xs={8} className="flex justify-start">
                <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                  <ClickAwayListener onClickAway={handleNewPwdClickAway}>
                    <TextField
                      id="new-password"
                      type={newPassword.show ? 'text' : 'password'}
                      value={newPassword.value}
                      onChange={handleNewPasswordChange('value')}
                      error={showNewPwdErr.error}
                      helperText={showNewPwdErr.message}
                      className={classes.customInputLabel}
                      onFocus={event => {
                        setNewPasswordFocused(true);
                      }}
                      InputProps = {{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowNewPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {newPassword.show ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </ClickAwayListener>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container className="items-center" spacing={2}>
              <Grid item lg={4} md={4} sm={4} xs={4} className="flex justify-end">
                <Typography>Confirm Password</Typography>
              </Grid>
              <Grid item lg={8} md={8} sm={8} xs={8} className="flex justify-start">
                <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                  <ClickAwayListener onClickAway={handleRetypePwdClickAway}>
                    <TextField
                      id="retype-new-password"
                      type={retypePassword.show ? 'text' : 'password'}
                      value={retypePassword.value}
                      onChange={handleRetypePasswordChange('value')}
                      error={showRetypePwdErr.error}
                      helperText={showRetypePwdErr.message}
                      className={classes.customInputLabel}
                      onFocus={event => {
                        setRetypePasswordFocused(true);
                      }}
                      InputProps = {{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowRetypePassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {retypePassword.show ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </ClickAwayListener>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ borderBottomWidth: 3 }}/>
      <DialogActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button
          color='primary'
          variant='contained'
          onClick={callResetPwdApi}
          disabled={showOldPwdErr.error && showNewPwdErr.error && showRetypePwdErr.error}
        >
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(AdminChangePasswordDialog);