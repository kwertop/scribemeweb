import React, { Fragment } from 'react';
import {
  Paper
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimerIcon from '@mui/icons-material/Timer';
import ReactAudioPlayer from 'react-audio-player';

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
    fontFamily: theme.typography.h1.fontFamily
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
  }
}));

interface Props {
  resource: any;
}

const AdminMeetingNote = ({ resource }: Props) => {
  const classes = useStyles();

  const data: any = resource.read();

  return (
    <Fragment>
      <div className="analytics m-sm-30 mt-6">
        <div>
          <span className={ classes.meetingTitle }>{ data.title }</span>
          <div className={ classes.detailBox }>
            <div className="flex flex-wrap items-center">
              <CalendarTodayIcon color='action' fontSize="small" className = { classes.meetingIcon }/>
              <span className={ classes.meetingDetails }>{ data.startTime }</span>
            </div>
            <div className="flex flex-wrap items-center">
              <TimerIcon color='action' fontSize="small" className = { classes.meetingIcon }/>
              <span className={ classes.meetingDetails }>{ data.duration }</span>
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
          <p>Hi</p>
        </Paper>
      </div>
      <div className="fixed-bottom">
        <ReactAudioPlayer
          src={ data.audioUrl }
          autoPlay
          controls
          className="full-width-div"
        />
      </div>
    </Fragment>
  );
}

export default AdminMeetingNote;