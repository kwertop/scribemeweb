import { themeColors } from './themeColors';
import { createTheme } from '@mui/material/styles';
import { forEach, merge } from 'lodash';
import themeOptions from './themeOptions';

function createAdminThemes() {
  let themes: {
    [key: string]: any
  } = {};

  forEach(themeColors, (value, key) => {
    let mergedTheme: any = merge({}, themeOptions, value);
    themes[key] = createTheme(mergedTheme);
  });
  return themes;
}
export const themes = createAdminThemes();
