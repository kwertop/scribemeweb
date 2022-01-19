import React, { Fragment } from 'react';
import { format } from 'date-fns';
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Checkbox,
  Fab,
  Avatar,
  Hidden,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  projectName: {
    marginLeft: 24,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 4,
    },
  },
}));

interface Props {
  data: any;
}

const RowCards = ({ data }: Props) => {
  const classes = useStyles();

  const fragments: any = data.agendas.length === 0 ?
    (
      <Fragment key={0}>
        <Card className="py-2 px-4 project-card">
          <Grid container alignItems="center">
            <Grid item md={5} xs={7}>
              <div className="flex items-center">
                <span className='card-title text-muted mb-4'>
                  You don't have any upcoming meetings
                </span>
              </div>
            </Grid>
          </Grid>
        </Card>
        <div className="py-2" />
      </Fragment>
    ) :
    data.agendas.map((agenda: any, index: number) => (
      <Fragment key={index}>
        <Card className="py-2 px-4 project-card">
          <Grid container alignItems="center">
            <Grid item md={5} xs={7}>
              <div className="flex items-center">
                <Checkbox />
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
                  Project {index}
                </span>
              </div>
            </Grid>

            <Grid item md={3} xs={4}>
              <div className="text-muted">
                {format(new Date().getTime(), 'MM/dd/yyyy hh:mma')}
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

            <Grid item xs={1}>
              <div className="flex justify-end">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Card>
        <div className="py-2" />
      </Fragment>
    )
   );

  return (
    <div>
      {fragments}
    </div>
  );
}

export default RowCards;
