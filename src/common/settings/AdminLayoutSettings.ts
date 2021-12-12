import layoutSettings from './LayoutSettings';
import { themes } from '../AdminTheme/initThemes';

// UPDATE BELOW CODE
// DOC http://demos.ui-lib.com/matx-react-doc/layout.html
export const AdminLayoutSettings = {
  activeLayout: 'layout', // layout1, layout2
  activeTheme: 'blue', // View all valid theme colors inside MatxTheme/themeColors.js
  perfectScrollbar: false,

  themes: themes,
  layoutSettings, // open Layout1/Layout1Settings.js

  secondarySidebar: {
    show: true,
    open: false,
    theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
  },
  // Footer options
  footer: {
    show: true,
    fixed: false,
    theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
  }
}
