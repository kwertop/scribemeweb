import React from 'react';
import { format } from 'date-fns';
import {
  Icon,
  Grid,
  Avatar,
  AvatarGroup,
  Hidden,
  Fab
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  productTable: {
    '& small': {
      height: 15,
      width: 50,
      borderRadius: 500,
      boxShadow:
        '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
      borderBottom: 'none',
    },
    '& td:first-child': {
      paddingLeft: '16px !important',
    },
  },
  projectName: {
    marginLeft: 24,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 4,
    },
  }
}));

interface Props {
  note: any;
  index: number;
}

const MeetingCard = ({ note, index }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const meetingAppIcon = (meetingApp: string) => {
    switch(meetingApp) {
      case "Zoom":
        return '/img/svg/icons8-zoom-32.svg';
      case "GoogleMeet":
        return '/img/svg/icons8-google-meet-32.svg';
      case "Teams":
        return '/img/svg/icons8-microsoft-teams-32.svg';
      case "Webex":
        return '/img/svg/icons8-cisco-webex-meetings-32.svg';
      default:
        return '';
    }
  }

  const openMeetingOnClick = (event: any) => {
    history.push(`/notes/${note.code}`);
  }

  const stringToColor = (name: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Grid item className="border-radius-4 meeting-card" alignItems="center" xs={11} md={11} onClick={ openMeetingOnClick }>
      <Grid item md={5} xs={7}>
        <div className="flex items-center">
          <Hidden smDown>
            <Fab
              className="ml-4 box-shadow-none text-white"
              size="small"
            >
                <img src={meetingAppIcon(note.via)} />
            </Fab>
          </Hidden>
          <span
            className={clsx(
              'font-medium',
              classes.projectName
            )}
          >
            {note.title}
          </span>
        </div>
      </Grid>

      <Grid item md={3} xs={4}>
        <div className="text-muted">
          {format((new Date(note.startTime)).getTime(), 'E, MMM do Y hh:mma')}
        </div>
      </Grid>

      <Hidden smDown>
        <Grid item xs={3}>
          {/*<div className="flex relative face-group">*/}
          <div className="flex relative">
            <AvatarGroup max={4}>
              <Avatar
                className="avatar"
                {...stringAvatar('Raju Sharma')}
              />
              <Avatar
                className="avatar"
                {...stringAvatar('Swati Sharma')}
              />
              <Avatar
                className="avatar"
                {...stringAvatar('Rahul Sharma')}
              />
              <Avatar className="text-14 avatar">+3</Avatar>
            </AvatarGroup>
          </div>
          {/*</div>*/}
        </Grid>
      </Hidden>

      {/*<Grid item xs={1}>
        <div className="flex justify-end">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </Grid>*/}
    </Grid>
  );
}

export default MeetingCard;
