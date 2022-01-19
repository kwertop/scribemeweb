import React, { Fragment } from 'react';
import { Grid, Card } from '@mui/material';
import RecordingsTable from './shared/RecordingsTable';
import RowCards from './shared/RowCards';
import MeetingCards from './shared/MeetingCards';
import UpgradeCard from './shared/UpgradeCard';
import ReferCard from './shared/ReferCard';
import { useTheme } from '@mui/material/styles';
import ErrorFallback from '../../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import AdminSuspense from '../../components/AdminSuspense';
import { dashboardResource } from '../../resources/external/ApiResource';

const Default = () => {
  const theme = useTheme();

  return (
    <Fragment>
      <div className="analytics m-sm-30 mt-6">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <AdminSuspense>
              <HomeContainer />
            </AdminSuspense>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <UpgradeCard />
            <ReferCard />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

const HomeContainer = () => {
  const data = dashboardResource.read();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <h4 className="card-title mb-4">
        Upcoming Meetings
      </h4>
      <RowCards data={data}/>
      <h4 className="card-title mb-4">
        Recent Meetings
      </h4>
      <MeetingCards data={data}/>
    </ErrorBoundary>
  );
}

export default Default;
