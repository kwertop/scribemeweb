import React from 'react';
import BuckBeakLogo from '../BuckBeakLogo';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useSettings } from '../../common/utils/useSettings';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  brand: {
    padding: '20px 18px 20px 29px',
  },
  hideOnCompact: {
    display: 'none',
  },
}));

interface Props {
  children: any;
}

const AdminBrand = ({ children }: Props) => {
  const classes = useStyles();
  const { settings } = useSettings();
  const leftSidebar = settings.layoutSettings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <div
      className={clsx('flex items-center justify-between', classes.brand)}
    >
      <div className="flex items-center">
        <BuckBeakLogo />
        <span
          className={clsx({
            'text-18 ml-2 font-medium sidenavHoverShow': true,
            [classes.hideOnCompact]: mode === 'compact',
          })}
        >
          BuckBeak
        </span>
      </div>
      <div
        className={clsx({
          sidenavHoverShow: true,
          [classes.hideOnCompact]: mode === 'compact',
        })}
      >
        {children || null}
      </div>
    </div>
  )
}

export default AdminBrand;
