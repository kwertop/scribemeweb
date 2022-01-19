import React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import AdminSideNav from '../AdminSideNav';
import AdminBrand from '../AdminBrand';
import { Switch, Hidden, Button } from '@mui/material';
import { convertHexToRGB } from '../../common/utils/convertHexToRGB';
import { useSettings } from '../../common/utils/useSettings';
import PlanButton from '../PlanButton';

interface StyleProps {
  width: string | undefined;
  primaryRGB: string | undefined;
  bgImgURL: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  sidenav: ({ width, primaryRGB, bgImgURL }: StyleProps) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: width,
    boxShadow: theme.shadows[8],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    zIndex: 111,
    overflow: 'hidden',
    color: theme.palette.text.primary,
    transition: 'all 250ms ease-in-out',
    backgroundImage: `linear-gradient(to bottom, rgba(${primaryRGB}, 0.96), rgba(${primaryRGB}, 0.96)), url(${bgImgURL})`,
    '&:hover': {
      width: 'var(--sidenav-width)',
      '& .sidenavHoverShow': {
        display: 'block',
      },
      '& .compactNavItem': {
        width: '100%',
        maxWidth: '100%',
        '& .nav-bullet': {
          display: 'block',
        },
        '& .nav-bullet-text': {
          display: 'none',
        },
      },
    },
  }),
  hideOnCompact: {
    display: 'none',
  },
  userInfo: {},
}))

const AdminLayoutSideNav = () => {
  const theme = useTheme();

  const { settings, updateSettings } = useSettings();

  const leftSidebar = settings.layoutSettings.leftSidebar;
  const { mode } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case 'compact':
        return 'var(--sidenav-compact-width)';
      default:
        return 'var(--sidenav-width)';
    }
  };

  const primaryRGB = convertHexToRGB(theme.palette.primary.main);
  const classes = useStyles({
    ...leftSidebar,
    width: getSidenavWidth(),
    primaryRGB
  });

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({
      layoutSettings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    })
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' });
  };

  return (
    <div className={classes.sidenav}>
      <div className="flex-column relative h-full">
        <AdminBrand>
          <Hidden smDown>
            <Switch
              onChange={handleSidenavToggle}
              checked={leftSidebar.mode !== 'full'}
              color="secondary"
              size="small"
            />
          </Hidden>
        </AdminBrand>
        <AdminSideNav />
        <PlanButton/>
      </div>
    </div>
  );
}

export default React.memo(AdminLayoutSideNav);
