import { Fragment, useState } from "react";
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';

interface Props {
  handleNextClick: Function;
  handlePreviousClick: Function;
  onCheckBoxChange: Function;
}

const AdminListMenuBar = ({ handleNextClick, handlePreviousClick, onCheckBoxChange }: Props) => {
  const [checked, setChecked] = useState(false);

  const setItemsChecked = (event: any) => {
    setChecked(!checked);
    onCheckBoxChange(!checked);
  }

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-start items-center px-6">
          <Checkbox size="small" onChange={setItemsChecked}/>
          <Button variant="text" startIcon={<FileDownloadOutlinedIcon />} sx={{ textTransform: 'none' }}>
            Export
          </Button>
          <Button variant="text" startIcon={<DeleteOutlinedIcon />} sx={{ textTransform: 'none' }}>
            Delete
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-end">
          <IconButton onClick={event => handlePreviousClick()}>
            <ChevronLeftOutlinedIcon />
          </IconButton>
          <IconButton onClick={event => handleNextClick()}>
            <ChevronRightOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider light sx={{ mt: 1, mb: 1 }}/>
    </Fragment>
  );
}

export default AdminListMenuBar;