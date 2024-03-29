import React, { Fragment } from 'react';
import Menu from '@mui/material/Menu';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useSettings } from '../../common/utils/useSettings';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    display: 'inline-block',
    color: theme.palette.text.primary,
    '& div:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const AdminMenu = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const children = React.Children.toArray(props.children);
  let { shouldCloseOnItemClick = true, horizontalPosition = 'left' } = props;
  const { settings } = useSettings();
  const classes = useStyles();

  const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
      setAnchorEl(null);
  }

  return (
    <Fragment>
      <div className={classes.menuButton} onClick={handleClick}>
          {props.menuButton}
      </div>
      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Menu
          elevation={8}
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: horizontalPosition,
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: horizontalPosition,
          }}
        >
          {children.map((child, index) => (
            <div
              onClick={
                shouldCloseOnItemClick ? handleClose : () => {}
              }
              key={index}
            >
              {child}
            </div>
          ))}
        </Menu>
      </ThemeProvider>
    </Fragment>
  );
}

export default AdminMenu;