import React, { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { navigations } from '../../common/config/navigations';
import AdminVertNav from '../AdminVertNav';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useSettings } from '../../common/utils/useSettings';

const useStyles = makeStyles((theme: Theme) => ({
  scrollable: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  sidenavMobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100vw',
    background: 'rgba(0, 0, 0, 0.54)',
    zIndex: -1,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  }
}))

interface Props {
  children?: any;
}

const AdminSideNav = ({ children }: Props) => {
  const classes = useStyles();
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings: any) => {
    // let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings.layoutSettings;

    updateSettings({
      ...settings,
      ['layoutSettings']: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  }

  return (
    <Fragment>
      <Scrollbar
        options={{ suppressScrollX: true }}
        className={clsx('relative px-4', classes.scrollable)}
      >
        {children}
        <AdminVertNav items={navigations} />
      </Scrollbar>

      <div
        onClick={() => updateSidebarMode({ mode: 'close' })}
        className={classes.sidenavMobileOverlay}
      />
    </Fragment>
  );
}

export default AdminSideNav;
