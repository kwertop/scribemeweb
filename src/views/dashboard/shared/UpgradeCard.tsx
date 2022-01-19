import React from 'react';
import { Card, Button, Paper, Link } from '@mui/material';

const UpgradeCard = () => {
  return (
    <Card className="mb-6">
      <Paper
        elevation={2}
        className="text-center relative bg-ultralight-primary p-sm-9"
      >
        <img
          src="/img/svg/rocket-launch-small.svg"
          alt="upgrade"
        />
        <p className="text-muted m-0 py-6">
          Upgrade to <b>BuckBeak PRO</b> for <br /> more resources
        </p>
        <Link href="#" color="primary" underline="none">
          Upgrade Now
        </Link>
      </Paper>
    </Card>
  )
}

export default UpgradeCard;
