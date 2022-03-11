import { Fragment, useState } from "react";
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    padding: '0px 8px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer'
    },
  },
  footerItem: {
    padding: '4px 8px',
    '&:hover': {
      cursor: 'pointer'
    },
  },
}));

interface Props {
  meetingTitle: string;
  meetingCode: string;
  numResults: number;
  isFooter: boolean;
  query: string;
  setOpenAutoComplete: Function;
  setAutoCompleteOpt: Function;
}

const SearchResultItem = ({ meetingTitle, meetingCode, numResults, isFooter, query, setOpenAutoComplete, setAutoCompleteOpt }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleFooterClick = () => {
    history.push(`/search?query=${query}`);
    setOpenAutoComplete(false);
    setAutoCompleteOpt([]);
  }

  return (
    <Fragment>
    {
      isFooter ?
      (
        <div className={ classes.footerItem } onClick={ handleFooterClick } >
          <Typography variant="subtitle2" align="center" style={{color:"#2259e3"}}>
            {`${numResults} Results | Show All`}
          </Typography>
        </div>
      ) :
      (
        <Fragment>
          <div className={ classes.item } onClick={ () => history.push(`/notes/${meetingCode}`)}>
            <Typography variant="subtitle1" align="left">{ meetingTitle }</Typography>
          </div>
          <Divider light sx={{ mt: 0.2, mb: 0.2 }}/>
        </Fragment>
      )
    }
    </Fragment>
  );
}

export default SearchResultItem;