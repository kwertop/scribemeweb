import React, { Fragment, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import MeetingCard from './MeetingCard';
import {
  Grid,
  Card,
  Checkbox,
  Avatar,
  Hidden,
  IconButton
} from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

interface Props {
  resource?: any;
}

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
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
  },
  exportDialogBox: {
    maxWidth: '556px',
    width: '556px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

const SearchResultCards = ({ resource }: Props) => {
	const data = resource.read();
	const classes = useStyles();

	const fragments: any = data.count === 0 ?
    (
      <Fragment key={0}>
        <Card className="py-2 px-4">
          <Grid container alignItems="center">
            <Grid item md={5} xs={7}>
              <div className="flex items-center">
                <span className='card-title text-muted mb-4'>
                  No Recent Activity. Transcribe your meeting now.
                </span>
              </div>
            </Grid>
          </Grid>
        </Card>
        <div className="py-2" />
      </Fragment>
    ) :
    data.notes.map((meetingNote: any, index: number) => (
      <Fragment key={index}>
        <Card className="py-2 px-4" sx={{ backgroundColor: '#fff' }}>
          <div className="flex items-center justify-between border-radius-4" id={meetingNote.code}>
            <MeetingCard note={meetingNote} index={index}/>
          </div>
        </Card>
        <div className="py-2" />
      </Fragment>
    )
  );

  return (
    <Fragment>
      {fragments}
    </Fragment>
  );
}

export default SearchResultCards;