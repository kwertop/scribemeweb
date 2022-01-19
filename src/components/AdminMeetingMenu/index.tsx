import React, { Fragment } from 'react';
import Menu from '@mui/material/Menu';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useSettings } from '../../common/utils/useSettings';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    display: 'flex',
    color: theme.palette.text.primary,
    justifyContent: 'flex-end'
  },
}));

const AdminMeetingMenu = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const children = React.Children.toArray(props.children);
  let { shouldCloseOnItemClick = true, horizontalPosition = 'right' } = props;
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
          PaperProps={{
            style: {
              width: '20ch',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            },
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

export default AdminMeetingMenu;