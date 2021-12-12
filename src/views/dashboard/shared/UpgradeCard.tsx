import React from 'react';
import { Card, Button } from '@mui/material';

const UpgradeCard = () => {
  return (
    <Card className="p-sm-24 mb-6">
      <Card
        elevation={0}
        className="box-shadow-none text-center relative bg-light-primary p-sm-24"
      >
        <img
          src="/assets/images/illustrations/upgrade.svg"
          alt="upgrade"
        />
        <p className="text-muted m-0 py-6">
          Upgrade to <b>ScribeMe PRO</b> for <br /> more resources
        </p>
        <Button
          className="uppercase"
          size="large"
          variant="contained"
          color="primary"
        >
          upgrade now
        </Button>
      </Card>
    </Card>
  )
}

export default UpgradeCard;
