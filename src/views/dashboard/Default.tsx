import React, { Fragment } from 'react';
import { Grid, Card } from '@mui/material';
import RecordingsTable from './shared/RecordingsTable';
import RowCards from './shared/RowCards';
import UpgradeCard from './shared/UpgradeCard';
import { useTheme } from '@mui/material/styles';

const Default = () => {
  const theme = useTheme();

  return (
    <Fragment>
      <div className="analytics m-sm-30 mt-6">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <h4 className="card-title text-muted mb-4">
              Upcoming Meetings
            </h4>
            <RowCards />
            {/* Top Selling Products */}
            <RecordingsTable />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <UpgradeCard />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

export default Default;
