import React from 'react';
import { Card, Button, Paper, Grid, Divider, Typography, Link } from '@mui/material';

const ReferCard = () => {
  return (
    <Card className="mb-6">
      <Paper
        elevation={2}
        className="text-center relative bg-ultralight-primary p-sm-9"
      >
        <Grid container>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <img
              src="/img/svg/rocket-launch-small.svg"
              alt="upgrade"
            />
          </Grid>
          <Grid item lg={9} md={9} sm={9} xs={9}>
            <Typography variant="h5" align="left">Tell a Friend</Typography>
            <Typography variant="subtitle2" align="left">Sharing is caring</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 1, mt: 1 }}/>
        <Link href="#" color="primary" underline="none">
          Share Now
        </Link>
      </Paper>
    </Card>
  )
}

export default ReferCard;
