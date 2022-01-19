import React, { Fragment, useState, forwardRef } from 'react';
import {
  Card,
  Grid,
  IconButton,
  MenuItem
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createBrowserHistory } from 'history';
import MeetingCard from './MeetingCard';
import AdminMeetingMenu from '../../../components/AdminMeetingMenu';
import Typography from '@mui/material/Typography';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Zoom from '@mui/material/Zoom';
import { TransitionProps } from '@mui/material/transitions';
import Divider from '@mui/material/Divider';
import AdminExportDialog from '../../../components/AdminExportDialog';
import Checkbox from '@mui/material/Checkbox';
import AdminListMenuBar from "../../../components/AdminListMenuBar";
import AdminTrashListMenuBar from "../../../components/AdminTrashListMenuBar";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';

import axios from 'axios';

const useStyles = makeStyles((theme: Theme) => ({
  productTable: {
    '& small': {
      height: 15,
      width: 50,
      borderRadius: 500,
      boxShadow:
        '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
      borderBottom: 'none',
    },
    '& td:first-child': {
      paddingLeft: '16px !important',
    },
  },
  projectName: {
    marginLeft: 24,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 4,
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
  },
  exportDialogBox: {
    maxWidth: '556px',
    width: '556px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

interface Props {
  resource?: any;
  data?: any;
  showCheckBox?: boolean;
  isTrash?: boolean;
  isList?: boolean;
}

const MeetingCards = ({ resource, data, showCheckBox, isTrash, isList }: Props) => {
  const readData = data ? data : resource.read();
  const classes = useStyles();
  const [meetingData, setMeetingData] = useState({
    meetingNotes: readData.meetingNotes,
    nextPage: readData.nextPage,
    previousPage: readData.previousPage,
    currentPage: readData.currentPage
  });
  const [format, setFormat] = useState('txt');
  const [txtSwitch, setTxtSwitch] = useState(true);
  const [audioSwitch, setAudioSwitch] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [partialCheck, setPartialCheck] = useState(false);
  const [itemsChecked, setItemsChecked] = useState(meetingData.meetingNotes.map((note: any, index: number) => {
    return {
      isChecked: false,
      rowId: index,
      code: note.code
    }
  }));

  const onAllChecked = (event: any) => {
    setAllChecked(!allChecked);
    setCheckBoxes(!allChecked);
    setPartialCheck(false);
  }

  const setCheckBoxes = (setChecked: boolean) => {
    setItemsChecked(itemsChecked.map((item: any, index: number) => {
      return {
        isChecked: setChecked,
        rowId: index,
        code: item.code
      }
    }));
  }

  const setCheckBox = (checkAtIndex: number, event: any) => {
    const newItemsChecked = itemsChecked.map((item: any, index: number) => {
      return {
        isChecked: checkAtIndex === index ? !item.isChecked : item.isChecked,
        rowId: index,
        code: item.code
      }
    });
    setItemsChecked(newItemsChecked);
    let checkedItemsCount = newItemsChecked.filter((item: any) => item.isChecked).length;
    if(checkedItemsCount === newItemsChecked.length) {
      setAllChecked(true);
      setPartialCheck(false);
    }
    else if(checkedItemsCount === 0) {
      setAllChecked(false);
      setPartialCheck(false);
    }
    else if(checkedItemsCount < newItemsChecked.length) {
      setAllChecked(false);
      setPartialCheck(true);
    }
  }

  const [openDialog, setOpenDialog] = useState({
    show: false,
    rowId: -1,
    meetingCode: '',
    meetingTitle: ''
  });

  const [openExportDialog, setOpenExportDialog] = useState({
    show: false,
    rowId: -1,
    meetingCode: '',
    meetingTitle: ''
  });

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Zoom ref={ref} {...props} />;
  });

  const onNextPageClick = async (inTrash: boolean) => {
    try {
      const response: any = await axios.get(`http://localhost:3100/my/meetings?page=${meetingData.nextPage}&inTrash=${inTrash}`);
      setMeetingData({
        meetingNotes: response.data.meetingNotes,
        nextPage: response.data.nextPage,
        previousPage: response.data.previousPage,
        currentPage: response.data.currentPage
      });
    }
    catch(err: any) {
      console.log("error while fetching meetings: ", err);
    }
  }

  const onPreviousPageClick = async (inTrash: boolean) => {
    try {
      const response: any = await axios.get(`http://localhost:3100/my/meetings?page=${meetingData.previousPage}&inTrash=${inTrash}`);
      setMeetingData({
        meetingNotes: response.data.meetingNotes,
        nextPage: response.data.nextPage,
        previousPage: response.data.previousPage,
        currentPage: response.data.currentPage
      });
    }
    catch(err: any) {
      console.log("error while fetching meetings: ", err);
    }
  }

  const handleDelete = (rowId: number, code: string, title: string) => {
    setOpenDialog({
      show: true,
      rowId: rowId,
      meetingCode: code,
      meetingTitle: title
    });
  }

  const handleExport = (rowId: number, code: string, title: string) => {
    setOpenExportDialog({
      show: true,
      rowId: rowId,
      meetingCode: code,
      meetingTitle: title
    });
  }

  const handleOkClose = async () => {
    try {
      const response = await axios.post("http://localhost:3100/meetings/delete", {
        codes: [ openDialog.meetingCode ]
      });
      meetingData.meetingNotes.splice(openDialog.rowId, 1);
      setMeetingData(meetingData);
    }
    catch(err: any) {
      console.log("error while calling api: ", err);
    }
    setOpenDialog({
      show: false,
      rowId: -1,
      meetingCode: '',
      meetingTitle: ''
    });
  };

  const handleCancelClose = () => {
    setOpenDialog({
      show: false,
      rowId: -1,
      meetingCode: '',
      meetingTitle: ''
    });
  };

  const handleExportCancelClose = () => {
    setOpenExportDialog({
      show: false,
      rowId: -1,
      meetingCode: '',
      meetingTitle: ''
    });
  };

  const handleSelectChange = (event: any) => {
    setFormat(event.target.value);
  };

  const fragments: any = meetingData.meetingNotes.length === 0 ?
    (
      <Fragment key={0}>
        <Card className="py-2 px-4 project-card">
          <Grid container alignItems="center">
            <Grid item md={5} xs={7}>
              <div className="flex items-center">
                <span className='card-title text-muted mb-4'>
                  No Recent Activity. Transcribe your meeting now.
                </span>
              </div>
            </Grid>
          </Grid>
        </Card>
        <div className="py-2" />
      </Fragment>
    ) :
    meetingData.meetingNotes.map((meetingNote: any, index: number) => (
      <Fragment key={index}>
        <Card className="py-2 px-4 project-card" sx={{ backgroundColor: itemsChecked[index].isChecked ? '#e7f4fe' : '#fff' }}>
          <div className="flex items-center justify-between border-radius-4" id={meetingNote.code}>
            {showCheckBox && <Checkbox size="small" checked={itemsChecked[index].isChecked} onChange={(event: any) => setCheckBox(index, event)}/>}
            <MeetingCard note={meetingNote} index={index}/>

            <AdminMeetingMenu
              menuButton={
                <Grid className="flex" item justifyContent="flex-end" xs={1} md={1}>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Grid>
              }
            >
              { isTrash ?
                (
                  <Fragment>
                    <MenuItem onClick={(event) => handleDelete(index, meetingNote.code, meetingNote.title)}>
                      <DeleteForeverRoundedIcon />
                      <span className="pl-4">Delete Forever</span>
                    </MenuItem>
                    <MenuItem onClick={(event) => handleExport(index, meetingNote.code, meetingNote.title)}>
                      <RestoreRoundedIcon />
                      <span className="pl-4"> Restore </span>
                    </MenuItem>
                  </Fragment>
                ) :
                (
                  <Fragment>
                    <MenuItem onClick={(event) => handleDelete(index, meetingNote.code, meetingNote.title)}>
                      <DeleteRoundedIcon />
                      <span className="pl-4">Delete</span>
                    </MenuItem>
                    <MenuItem onClick={(event) => handleExport(index, meetingNote.code, meetingNote.title)}>
                      <FileDownloadOutlinedIcon />
                      <span className="pl-4"> Export </span>
                    </MenuItem>
                  </Fragment>
                )
              }
            </AdminMeetingMenu>
          </div>
        </Card>
        <div className="py-2" />
      </Fragment>
    )
   );

  return (
    <div>
      { isTrash &&
        (
          <Fragment>
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-start items-center px-sm-25">
                <Checkbox size="small" onChange={onAllChecked} indeterminate={partialCheck} checked={allChecked}/>
                <Button variant="text" startIcon={<RestoreOutlinedIcon />} sx={{ textTransform: 'none' }}>
                  Restore
                </Button>
                <Button variant="text" startIcon={<DeleteForeverOutlinedIcon />} sx={{ textTransform: 'none' }}>
                  Delete Forever
                </Button>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-end">
                <IconButton onClick={event => onPreviousPageClick(true)} disabled={meetingData.previousPage === null}>
                  <ChevronLeftOutlinedIcon />
                </IconButton>
                <IconButton onClick={event => onNextPageClick(true)} disabled={meetingData.nextPage === null}>
                  <ChevronRightOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider light sx={{ mt: 1, mb: 1 }}/>
          </Fragment>
        )
      }
      { isList &&
        (
          <Fragment>
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-start items-center px-sm-25">
                <Checkbox size="small" onChange={onAllChecked} indeterminate={partialCheck} checked={allChecked}/>
                <Button variant="text" startIcon={<FileDownloadOutlinedIcon />} sx={{ textTransform: 'none' }}>
                  Export
                </Button>
                <Button variant="text" startIcon={<DeleteOutlinedIcon />} sx={{ textTransform: 'none' }}>
                  Delete
                </Button>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-end">
                <IconButton onClick={event => onPreviousPageClick(false)} disabled={meetingData.previousPage === null}>
                  <ChevronLeftOutlinedIcon />
                </IconButton>
                <IconButton onClick={event => onNextPageClick(false)} disabled={meetingData.nextPage === null}>
                  <ChevronRightOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider light sx={{ mt: 1, mb: 1 }}/>
          </Fragment>
        )
      }
      {fragments}
      {openDialog.show && 
        (
          <Dialog
            open={openDialog.show}
            TransitionComponent={Transition}
            onClose={handleCancelClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              <Typography variant="h5" align="center">Delete</Typography>
            </DialogTitle>
            <Divider sx={{ borderBottomWidth: 3 }}/>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this conversation? <br/> <br/>
                <Typography variant="body2" align="center">{openDialog.meetingTitle}</Typography>
              </DialogContentText>
            </DialogContent>
            <Divider sx={{ borderBottomWidth: 3 }}/>
            <DialogActions>
              <Button color='primary' variant='outlined' onClick={handleCancelClose}>Cancel</Button>
              <Button color='error' variant='contained' onClick={handleOkClose}>Ok</Button>
            </DialogActions>
          </Dialog>
        )
      }
      {openExportDialog.show && 
        (
          <AdminExportDialog
            handleClose={handleExportCancelClose}
            showDialog={openExportDialog.show}
            format={format}
            handleSelectChange={handleSelectChange}
            txtSwitch={txtSwitch}
            setTxtSwitch={setTxtSwitch}
            audioSwitch={audioSwitch}
            setAudioSwitch={setAudioSwitch}
            fileName={openExportDialog.meetingTitle}
          />
        )
      }
    </div>
  );
}

const openMeetingOnClick = (event: any) => {
  const history: any = createBrowserHistory({ forceRefresh: false });
  history.push(`/notes/{code}`);
}

export default MeetingCards;
