import { Fragment } from "react";
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';

const AdminTrashListMenuBar = () => {

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-start items-center px-6">
          <Checkbox size="small"/>
          <Button variant="text" startIcon={<RestoreOutlinedIcon />} sx={{ textTransform: 'none' }}>
            Restore
          </Button>
          <Button variant="text" startIcon={<DeleteForeverOutlinedIcon />} sx={{ textTransform: 'none' }}>
            Delete Forever
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-end">
          <IconButton>
            <ChevronLeftOutlinedIcon />
          </IconButton>
          <IconButton>
            <ChevronRightOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider light sx={{ mt: 1, mb: 1 }}/>
    </Fragment>
  );
}

export default AdminTrashListMenuBar;