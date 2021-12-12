import React, { useContext, useEffect, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Scrollbar from 'react-perfect-scrollbar';
import { renderRoutes } from 'react-router-config';
import AdminTopBar from '../AdminTopBar';
import AdminLayoutSideNav from '../AdminLayoutSideNav';
import AdminSuspense from '../AdminSuspense';
import { useTheme, Theme } from '@mui/material/styles';
import clsx from 'clsx';
import AdminSideNavTheme from '../AdminSideNavTheme';
import { makeStyles } from '@mui/styles';
import { useSettings } from '../../common/utils/useSettings';
import AppContext from '../../common/contexts/AppContext';

interface StyleProps {
  width: string | undefined;
  secondarySidebar: any | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  contentWrap: ({ width, secondarySidebar }: StyleProps) => {
    return {
      verticalAlign: 'top',
      marginLeft: width,
      transition: 'all 0.3s ease',
      // [theme.breakpoints.up("sm")]: {
      marginRight: secondarySidebar.open ? 50 : 0,
      // },
    }
  },
  topbar: {
    top: 0,
    zIndex: 96,
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',
    transition: 'all 0.3s ease',
  }
}))

const Layout = () => {
  const { settings, updateSettings } = useSettings();
  const { layoutSettings, secondarySidebar } = settings;
  const { leftSidebar: { mode: sidenavMode, show: showSidenav } } = layoutSettings;
  const { dashboardRoutes }: any = useContext(AppContext);

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case 'full':
        return 'var(--sidenav-width)';
      case 'compact':
        return 'var(--sidenav-compact-width)';
      default:
        return '0px';
    }
  }

  const sidenavWidth = getSidenavWidth();
  let classes = useStyles({ width: sidenavWidth, secondarySidebar });
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const ref = useRef({ isMdScreen, settings });

  const topbarTheme = settings.themes[layoutSettings.topbar.theme];
  // const layoutClasses = `theme-${theme.palette.type} flex`;

  useEffect(() => {
    let { settings } = ref.current
    let sidebarMode = settings.layoutSettings.leftSidebar.mode
    if (settings.layoutSettings.leftSidebar.show) {
      let mode = isMdScreen ? 'close' : sidebarMode
      updateSettings({ layoutSettings: { leftSidebar: { mode } } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <div className={clsx('bg-default')}>
      {showSidenav && sidenavMode !== 'close' && (
        <AdminSideNavTheme>
          <AdminLayoutSideNav />
        </AdminSideNavTheme>
      )}

      <div
        className={clsx(
          'flex-grow flex-column relative overflow-hidden h-full-screen',
          classes.contentWrap
        )}
      >
        {layoutSettings.topbar.show && layoutSettings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <AdminTopBar />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <Scrollbar className="flex-grow flex-column relative h-full">
            {layoutSettings.topbar.show &&
              !layoutSettings.topbar.fixed && (
                <ThemeProvider theme={topbarTheme}>
                  <AdminTopBar />
                </ThemeProvider>
              )}
            <div className="relative flex-grow">
              <AdminSuspense>{renderRoutes(dashboardRoutes)}</AdminSuspense>
            </div>
          </Scrollbar>
        )}

        {!settings.perfectScrollbar && (
          <div className="flex-grow flex-column relative h-full scroll-y">
            {layoutSettings.topbar.show &&
              !layoutSettings.topbar.fixed && (
                <ThemeProvider theme={topbarTheme}>
                  <AdminTopBar />
                </ThemeProvider>
              )}
            <div className="relative flex-grow">
              <AdminSuspense>{renderRoutes(dashboardRoutes)}</AdminSuspense>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Layout);
