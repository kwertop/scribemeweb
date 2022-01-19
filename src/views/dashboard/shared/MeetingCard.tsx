import React from 'react';
import { format } from 'date-fns';
import {
  Icon,
  Grid,
  Avatar,
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

  const openMeetingOnClick = (event: any) => {
    history.push(`/notes/${note.code}`);
  }

  return (
    <Grid item className="border-radius-4 meeting-card" alignItems="center" xs={11} md={11} onClick={ openMeetingOnClick }>
      <Grid item md={5} xs={7}>
        <div className="flex items-center">
          <Hidden smDown>
            {index % 2 === 1 ? (
              <Fab
                className="ml-4 bg-error box-shadow-none"
                size="small"
              >
                <Icon>star_outline</Icon>
              </Fab>
            ) : (
              <Fab
                className="ml-4 bg-green box-shadow-none text-white"
                size="small"
              >
                <Icon>date_range</Icon>
              </Fab>
            )}
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
          {format((new Date(note.startTime)).getTime(), 'MM/dd/yyyy hh:mma')}
        </div>
      </Grid>

      <Hidden smDown>
        <Grid item xs={3}>
          <div className="flex relative face-group">
            <Avatar
              className="avatar"
              src="/assets/images/face-4.jpg"
            />
            <Avatar
              className="avatar"
              src="/assets/images/face-4.jpg"
            />
            <Avatar
              className="avatar"
              src="/assets/images/face-4.jpg"
            />
            <Avatar className="text-14 avatar">+3</Avatar>
          </div>
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
