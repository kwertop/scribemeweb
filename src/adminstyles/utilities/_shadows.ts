import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const shadowStyles = makeStyles((theme: Theme) => ({
  '@global': {
    ...generateShadows(theme),
  }
}));

const generateShadows = (theme: Theme) => {
  let classList: any = {};

  theme.shadows.forEach((shadow, ind) => {
    classList[`.elevation-z${ind}`] = {
      boxShadow: `${shadow} !important`,
    }
  });

  return classList;
}
