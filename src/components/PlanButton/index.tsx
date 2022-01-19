import React from 'react';
import BuckBeakLogo from '../BuckBeakLogo';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useSettings } from '../../common/utils/useSettings';
import { Theme } from '@mui/material/styles';
import { Button, Icon } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  planSection: {
    marginTop: 'auto',
    zIndex: 500
  },
}));

const PlanButton = () => {
  const classes = useStyles();
  const svgIcon = (
    <Icon>
      <img alt="basic" src="/img/svg/badge-16.png" />
    </Icon>
  );

  return (
    <div className={classes.planSection}>
      <Button
        startIcon={svgIcon}
        sx={{
          background: '-webkit-linear-gradient(left, #120af5, #05c3f7)',
          borderRadius: 0
        }}
        fullWidth
        disableRipple
      >
        BASIC
      </Button>
    </div>
  );
}

export default PlanButton;