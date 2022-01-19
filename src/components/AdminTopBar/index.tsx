import React from 'react';
import {
  IconButton,
  MenuItem,
  Avatar,
  useMediaQuery,
  Hidden
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AdminMenu from '../AdminMenu';
import AdminSearchBox from '../AdminSearchBox';
import { useHistory } from 'react-router-dom';
import { useTheme, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useSettings } from '../../common/utils/useSettings';
import useAuth from '../../common/utils/useAuth';

const useStyles = makeStyles((theme: Theme) => ({
  topbar: {
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

    '& .topbar-hold': {
      backgroundColor: theme.palette.primary.main,
      height: 80,
      paddingLeft: 18,
      paddingRight: 20,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
      },
    },
    '& .fixed': {
      boxShadow: theme.shadows[8],
      height: 64,
    },
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
      margin: '0 8px',
      // color: palette.text.secondary
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
  },
}));

interface LogoutHook {
  logout?: any;
  user?: any;
}

const AdminTopBar = () => {
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles();
  const { settings, updateSettings } = useSettings();
  const { logout, user }: LogoutHook = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fixed = settings?.layoutSettings?.topbar?.fixed;

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({
      layoutSettings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    });
  }

  const openPreferences = (event: any) => {
    history.push('/preferences');
  }

  const handleSidebarToggle = () => {
    let { layoutSettings } = settings;
    let mode;

    if (isMdScreen) {
      mode = layoutSettings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    }
    else {
      mode = layoutSettings.leftSidebar.mode === 'full' ? 'close' : 'full'
    }

    updateSidebarMode({ mode });
  }

  if(["/preferences"].includes(window.location.pathname)) {
    return null;
  }

  return (
    <div className={classes.topbar}>
      <div className={clsx({ 'topbar-hold': true, fixed: fixed })}>
        <div className="flex justify-between items-center h-full">
          <div className="flex">
            <IconButton
                onClick={handleSidebarToggle}
            >
                <MenuOpenIcon />
            </IconButton>
          </div>
          <div className="flex items-center">
            <AdminSearchBox />

            {/* <NotificationBar2 /> */}

            <AdminMenu
              menuButton={
                <div className={classes.userMenu}>
                  <Hidden xsDown>
                    <span>
                      Hi <strong>{user.name}</strong>
                    </span>
                  </Hidden>
                  <Avatar
                    className="cursor-pointer"
                    src={user.avatar}
                  />
                </div>
              }
            >
              <MenuItem onClick={openPreferences}>
                <PersonIcon />
                <span className="pl-4"> Profile </span>
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={openPreferences}>
                <SettingsIcon />
                <span className="pl-4"> Settings </span>
              </MenuItem>
              <MenuItem
                onClick={logout}
                className={classes.menuItem}
              >
                <PowerSettingsNewIcon />
                <span className="pl-4"> Logout </span>
              </MenuItem>
            </AdminMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AdminTopBar);
