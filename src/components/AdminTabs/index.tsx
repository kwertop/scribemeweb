import React, { useState } from 'react';
import AdminPlan from '../AdminPlan';
import AdminProfile from '../AdminProfile';
import { Theme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  tabClass: {
    padding: '0px 10px',
    margin: '0px 30px'
  },
  settingsDiv: {
    margin: '0% 10%'
  },
  labelsDiv: {
    width: '22%'
  },
  textBox: {
    width: '60%',
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '3px',
    '&.Mui-focused': {
      boxShadow: '0 0 8px rgba(0, 0, 255, 1)'
    }
  },
  inputFocused: {
    boxShadow: '0 0 8px rgba(0, 0, 255, 1)'
  },
  menuItem: {
    margin: '45px 0px'
  },
  resizeText: {
    font: '50px'
  },
  rightArrow: {
    float: 'right'
  },
  otherMenuItem: {
    margin: '20px 0px'
  },
  otherLabelsDiv: {
    width: '28.2%'
  },
  nameButton: {
    margin: '0px 5px'
  }
}));

const AdminTabs = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="General" {...a11yProps(0)} className={classes.tabClass} />
          <Tab label="Subscription" {...a11yProps(1)} className={classes.tabClass} />
          <Tab label="Notification" {...a11yProps(2)} className={classes.tabClass} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AdminProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminPlan />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Notiification
      </TabPanel>
    </Box>
  );
}

export default AdminTabs;
