import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useSettings } from '../../utils/useSettings';

interface Props {
  children: any;
}

const SideNavTheme = ({ children }: Props) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const sidenavTheme = settings.themes[settings.layoutSettings.leftSidebar.theme] || theme;

  return <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>
}

export default SideNavTheme;
