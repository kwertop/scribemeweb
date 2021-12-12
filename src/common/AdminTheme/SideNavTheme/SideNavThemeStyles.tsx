import React from 'react';
import { withStyles } from '@mui/styles';

const styles = (theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '& .sidenav': {
      // "& .sidenav__hold": {
      opacity: '1 !important',
      '&::after': {
        background: theme.palette.primary.main,
        opacity: 0.96,
      },
      '& .nav-item:not(.badge)': {
        color: theme.palette.text.primary,
      },
      '& .nav-item': {
        '&.active, &.active:hover': {
          background: theme.palette.secondary.main,
        },
        '& .icon-text::after': {
          background: theme.palette.text.primary,
        },
      },
    },
  },
});

interface Props {
  children: any;
  classes: any
}

const SidenavThemeStyles = ({ children, classes }: Props) => {
  return <div className={classes.root}>{children}</div>
}

export default withStyles(styles, { withTheme: true })(SidenavThemeStyles);