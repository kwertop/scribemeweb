import React, { Fragment, useState } from 'react';
import {
  Paper,
  Avatar,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimerIcon from '@mui/icons-material/Timer';
import ReactAudioPlayer from 'react-audio-player';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { API_ENDPOINT } from '../../constants';

import axios from 'axios';

const useStyles = makeStyles((theme: Theme) => ({
  transcript: {
    height: 750
  },
  wordTag: {
    border: '1px solid rgba(0, 0, 0, 0.6)',
    padding: '1px',
    margin: '1.5px',
    borderRadius: '7px',
    backgroundColor: 'rgba(0, 0, 0, 0.07)'
  },
  meetingTitle: {
    color: 'inherit',
    fontSize: '2.1rem',
    lineHeight: '5px',
    fontFamily: theme.typography.h1.fontFamily,
    border: '1px solid transparent',
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
      border: '1px solid rgba(0, 0, 0, 0.8)',
    },
    '&.Mui-focused': {
      border: '1px solid rgba(0, 0, 0, 0.8)'
    }
  },
  meetingDetails: {
    marginLeft: '2px',
    marginRight: '25px',
    fontSize: '0.8rem',
    fontColor: 'rgba(0, 0, 0, 0.1)'
  },
  meetingIcon: {
    paddingBottom: '2px'
  },
  glossary: {
    marginTop: '10px'
  },
  detailBox: {
    display: 'flex',
    marginTop: '5px',
    alignItems: 'center'
  },
  nameButton: {
    margin: '0px 5px'
  }
}));

interface Props {
  resource: any;
}

const AdminMeetingNote = ({ resource }: Props) => {
  const classes = useStyles();
  const [seekSecond, setSeekSecond] = useState(0);
  const [showSaveBtns, setShowSaveBtns] = useState(false);
  const [showLoaderOnSaveClick, setShowLoaderOnSaveClick] = useState(false);

  const data: any = resource.read();
  const [meetingTitle, setMeetingTitle] = useState(data.title);
  const [meetingCode, setMeetingCode] = useState(data.code);
  const [oldTitle, setOldTitle] = useState(data.title);
  const [saveClicked, setSaveClicked] = useState(false);

  const getMMHHSS = (seconds: number) => {
    if(seconds < 3600) {
      return new Date(seconds * 1000).toISOString().substr(14, 5);
    }
    else {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    }
  }

  const onAudioListen = (time: number) => {
    let second = Math.floor(time);
    let oldSpanElem = document.getElementById(`speech-span-${seekSecond}`);
    if(oldSpanElem) {
      oldSpanElem.style.backgroundColor = 'white';
    }
    let spanElem = document.getElementById(`speech-span-${second}`);
    if(spanElem) {
      spanElem.style.backgroundColor = 'yellow';
      spanElem.scrollIntoView();
    }
    setSeekSecond(second);
  }

  const handleClickAway = () => {
    if(saveClicked) {
      setSaveClicked(false);
    }
    else {
      setShowSaveBtns(false);
      setMeetingTitle(oldTitle);
    }
  }

  const handleMeetingTitleSave = async () => {
    setSaveClicked(true);
    try {
      const response: any = await axios.post(`${API_ENDPOINT}/meetings/edit/${meetingCode}`, {
        title: meetingTitle
      });
      setShowSaveBtns(false);
      if(response.data.status === "ok") {
        setOldTitle(meetingTitle);
      }
      else {
        setMeetingTitle(oldTitle);
      }
    }
    catch(err: any) {
      setMeetingTitle(oldTitle);
      console.log("error while saving meeting title: ", err);
    }
  }

  const handleTitleChange = (event: any) => {
    setMeetingTitle(event.target.value);
  }

  return (
    <Fragment>
      <div className="analytics m-sm-30 mt-6">
        <div>
          <div className="flex items-center justify-start" >
            <ClickAwayListener onClickAway={handleClickAway}>
                <Input
                  type="text"
                  className={classes.meetingTitle}
                  disableUnderline={true}
                  sx={{ height: 50, width: 600 }}
                  // inputProps={{style: {fontSize: 16, padding: '10px', cursor: 'pointer'}}}
                  value={meetingTitle}
                  onFocus={event => {
                    event.target.select();
                    setOldTitle(meetingTitle);
                    setShowSaveBtns(true);
                  }}
                  onChange={handleTitleChange}
                />
            </ClickAwayListener>
                { showSaveBtns ?
                  (
                    <div className="flex justify-start items-center">
                      <div className={classes.nameButton}>
                        <Button
                          size="small"
                          disableRipple
                          variant="contained"
                          className="mx-auto"
                          sx={{ height: 24, width: 40}}
                          onClick={handleMeetingTitleSave}
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
                          onClick={event => handleClickAway()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : showLoaderOnSaveClick ? <CircularProgress/> : null
                }
          </div>
          <div className={ classes.detailBox }>
            <div className="flex flex-wrap items-center">
              <CalendarTodayIcon color='action' fontSize="small" className = { classes.meetingIcon }/>
              <span className={ classes.meetingDetails }>{ data.startTime }</span>
            </div>
            <div className="flex flex-wrap items-center">
              <TimerIcon color='action' fontSize="small" className = { classes.meetingIcon }/>
              <span className={ classes.meetingDetails }>{ getMMHHSS(data.duration) }</span>
            </div>
          </div>
        </div>
        <div className= { classes.glossary }>
          <h5>Glossary</h5>
          { data.glossary.map((word: string) => (
              <span className={ classes.wordTag }>{ word }</span>
            ))
          }
        </div>
        <Paper className={ classes.transcript } elevation={4}>
          <div className="p-sm-9">
            {
              data.transcripts.map((transcript: any) => (
                <div className="mb-sm-18">
                  <div className="flex items-center">
                    <Avatar className="avatar" src={transcript.speakerImg}/>
                    <Typography className="px-sm-8" variant="subtitle2">{transcript.speaker},</Typography>
                    <Typography variant="subtitle2">{getMMHHSS(transcript.startTime)}</Typography>
                  </div>
                  <div className="pxl-sm-40">
                    <Typography variant="subtitle1">
                      {
                        transcript.seeks.map((seek: any) => (
                          <span id={`speech-span-${seek.start}`}>{seek.words} </span>
                        ))
                      }
                    </Typography>
                  </div>
                </div>
              ))
            }
          </div>
        </Paper>
      </div>
      <div className="fixed-bottom">
        <ReactAudioPlayer
          src={ data.audioUrl }
          controls
          className="full-width-div"
          listenInterval={1000}
          onListen={onAudioListen}
        />
      </div>
    </Fragment>
  );
}

export default AdminMeetingNote;