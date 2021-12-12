import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useSettings } from '../../common/utils/useSettings';

interface Props {
  children?: any;
}

const AdminSideNavTheme = ({ children }: Props) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const sidenavTheme = settings.themes[settings.layoutSettings.leftSidebar.theme] || theme;

  return <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>;
}

export default AdminSideNavTheme;
