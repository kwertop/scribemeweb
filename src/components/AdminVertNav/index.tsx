import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import TouchRipple from '@mui/material/ButtonBase';
import AdminVertNavExpPanel from '../AdminVertNavExpPanel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LaunchIcon from '@mui/icons-material/Launch';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import clsx from 'clsx';
import LayoutSettings from '../../common/settings/LayoutSettings';

const useStyles = makeStyles((theme: Theme) => ({
    navItem: {
      transition: 'all 150ms ease-in',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    navItemActive: {
      backgroundColor: theme.palette.action.selected,
    },
    compactNavItem: {
      overflow: 'hidden',
      justifyContent: 'center !important',
      '& $itemText': {
        display: 'none',
      },
      '& $itemIcon': {
        display: 'none',
      },
    },
    itemIcon: {},
    itemText: {
      fontSize: '0.875rem',
      paddingLeft: '0.8rem',
    },
    label: {
      color: theme.palette.text.secondary,
    },
    bulletIcon: {
      background: theme.palette.text.secondary,
    },
}));

interface Props {
  items?: any;
}

const renderIcon = (iconName: string) => {
  switch(iconName) {
    case 'dashboard':
      return (
        <DashboardIcon sx={{ width: 48, fontSize: 18, verticalAlign: 'middle', paddingLeft: '1rem', paddingRight: '1rem' }} />
      );
      break;
    case 'launch':
      return (
        <LaunchIcon sx={{ width: 48, fontSize: 18, verticalAlign: 'middle', paddingLeft: '1rem', paddingRight: '1rem' }} />
      );
      break;
    default:
      return (
        <Icon> icon </Icon>
      );
      break;
  }
}

const AdminVertNav = ({ items }: Props) => {
  const { mode } = LayoutSettings.leftSidebar;
  const classes = useStyles();

  const MuiIcons: any = {};
  MuiIcons["dashboard"] = DashboardIcon;

  const renderLevels = (data: any) => {
    return data.map((item: any, index: number) => {
      if (item.type === 'label')
        return (
          <p
            key={index}
            className={clsx({
              'px-4 mb-2 mt-6 uppercase text-12 sidenavHoverShow': true,
              [classes.label]: true,
              hidden: mode === 'compact',
            })}
          >
            {item.label}
          </p>
        )
      if (item.children) {
        return (
          <AdminVertNavExpPanel
            mode={mode}
            item={item}
            key={index}
          >
            {renderLevels(item.children)}
          </AdminVertNavExpPanel>
        );
      } else if (item.type === 'extLink') {
        return (
          <a
            key={index}
            href={item.path}
            className={clsx({
              'flex justify-between h-44 border-radius-4 mb-2 compactNavItem whitespace-pre overflow-hidden': true,
              [classes.navItem]: true,
              [classes.compactNavItem]: mode === 'compact',
            })}
            rel="noopener noreferrer"
            target="_blank"
          >
            <TouchRipple
              key={item.name}
              name="child"
              className="w-full"
            >
              {(() => {
                  if (item.icon) {
                    return renderIcon(item.icon);
                  } else {
                    return (
                      <span className="item-icon icon-text">
                        {item.iconText}
                      </span>
                    );
                  }
              })()}
              <span
                className={clsx(
                  'align-middle sidenavHoverShow',
                  classes.itemText
                )}
              >
                {item.name}
              </span>
              <div className="mx-auto"></div>
              {item.badge && (
                  <div
                      className={`rounded bg-${item.badge.color} px-1 py-1px`}
                  >
                      {item.badge.value}
                  </div>
              )}
            </TouchRipple>
          </a>
        );
      } else {
        return (
          <NavLink
              key={index}
              to={item.path}
              activeClassName={classes.navItemActive}
              className={clsx({
                'flex justify-between h-44 border-radius-4 mb-2 compactNavItem whitespace-pre overflow-hidden': true,
                [classes.navItem]: true,
                [classes.compactNavItem]: mode === 'compact',
              })}
          >
            <TouchRipple
              key={item.name}
              name="child"
              className="w-full"
            >
              {item?.icon ? (
                renderIcon(item.icon)
              ) : (
                <Fragment>
                  <div
                    className={clsx({
                      'nav-bullet p-2px rounded ml-6 mr-2': true,
                      [classes.bulletIcon]: true,
                      hidden: mode === 'compact',
                    })}
                  ></div>
                  <div
                    className={clsx({
                      'nav-bullet-text ml-5 text-11': true,
                      hidden: mode !== 'compact',
                    })}
                  >
                    {item.iconText}
                  </div>
                </Fragment>
              )}
              <span
                className={clsx(
                  'align-middle text-left sidenavHoverShow',
                  classes.itemText
                )}
              >
                {item.name}
              </span>
              <div className="mx-auto"></div>
              {item.badge && (
                <div
                  className={clsx(
                    `rounded bg-${item.badge.color} px-1 py-1px`,
                    'sidenavHoverShow',
                    classes.itemIcon
                  )}
                >
                  {item.badge.value}
                </div>
              )}
            </TouchRipple>
          </NavLink>
        );
      }
    });
  }

  return <div className="navigation">{renderLevels(items)}</div>;
}

export default React.memo(AdminVertNav);
