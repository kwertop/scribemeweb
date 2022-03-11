import React, { forwardRef, memo } from 'react';
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
  MenuItem,
  Select,
  Input
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

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
  }
}));

interface Props {
  handleClose: any;
  showDialog: boolean;
  handleSelectChange: any;
  format: string;
  txtSwitch: boolean;
  setTxtSwitch: any;
  audioSwitch: boolean;
  setAudioSwitch: any;
  fileName: string;
}

const AdminExportDialog = ({
  handleClose,
  showDialog,
  format,
  handleSelectChange,
  txtSwitch,
  setTxtSwitch,
  audioSwitch,
  setAudioSwitch,
  fileName }: Props) => {
  const classes = useStyles();

  const onTextSwitch = (event: any) => {
    setTxtSwitch(!txtSwitch);
  }

  const onAudioSwitch = (event: any) => {
    setAudioSwitch(!audioSwitch);
  }

  return (
    <Dialog
      open={showDialog}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex items-center justify-between">
        <Typography variant="h5" align="center">Export</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderBottomWidth: 3 }}/>
      <DialogContent sx={{ paddingLeft: '8px', paddingRight: '0px'}}>
        <DialogContentText id="alert-dialog-slide-description">
        <div className={classes.exportDialogBox}>
          <div className="flex items-center justify-between h-44px">
            <Typography>Transcription</Typography>
            <Switch checked={txtSwitch} onChange={onTextSwitch}/>
          </div>
          <Divider light/>
          { txtSwitch ?
            (
              <div id="text-format-setting" className="flex items-center justify-between px-sm-30 h-44px">
                <Typography>Text Format</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={format}
                    onChange={handleSelectChange}
                    sx={{ 'height': '36px' }}
                    label={null}
                    variant="standard"
                  >
                    <MenuItem value={'txt'}>TXT</MenuItem>
                    <MenuItem value={'docx'}>DOCX (PRO)</MenuItem>
                    <MenuItem value={'pdf'}>PDF (PRO)</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ) :
            null
          }
          <Divider light/>
          <div className="flex items-center justify-between h-44px">
            <Typography>Audio</Typography>
            <Switch checked={audioSwitch} onChange={onAudioSwitch}/>
          </div>
          <Divider light/>
          { audioSwitch ?
            (
              <div id="audio-format-setting" className="flex items-center justify-between px-sm-30 h-44px">
                <Typography>Audio Format</Typography>
                <Typography sx={{ paddingRight: '8px'}}>MP3</Typography>
              </div>
            ) :
            null
          }
          <Divider light/>
          { !audioSwitch && !txtSwitch ?
            (
              <div className="flex items-center h-44px justify-around">
                <Typography sx={{ color: 'rgba(255, 0, 0, 0.8)'}}>You need to select at least one to be able to export.</Typography>
              </div>
            ) :
            (
              <div className="flex items-center justify-between h-44px pxr-sm-16">
                <Typography>File Name</Typography>
                <div className="flex justify-end items-center">
                  <Input
                    type="text"
                    className={classes.textBox}
                    disableUnderline={true}
                    sx={{ height: 30, width: 264 }}
                    inputProps={{style: {fontSize: 16, padding: '10px'}}}
                    defaultValue={fileName}
                  />
                  <Typography>
                    {
                      audioSwitch && txtSwitch ? '.zip' : audioSwitch && !txtSwitch ? '.mp3' : '.txt'
                    }
                  </Typography>
                </div>
              </div>
            )
          }
        </div>
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ borderBottomWidth: 3 }}/>
      <DialogActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button
          color='primary'
          variant='contained'
          onClick={handleClose}
          disabled={!txtSwitch && !audioSwitch}
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(AdminExportDialog);