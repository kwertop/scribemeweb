import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdminCssVars from './AdminCssVars';
import { useSettings } from '../utils/useSettings';

// import cssVars from "css-vars-ponyfill";

interface Props {
  children: any;
}

interface Settings {
  settings: any;
}

const AdminTheme = ({ children }: Props) => {
  const { settings } : Settings = useSettings();
  let activeTheme = { ...settings.themes[settings.activeTheme] };
  // console.log(activeTheme)
  // cssVars();
  // activeTheme.direction = settings.direction;
  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <AdminCssVars> {children} </AdminCssVars>
    </ThemeProvider>
  );
}

export default AdminTheme;
