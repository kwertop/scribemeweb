import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchResultItem from '../../common/SearchResultItem';
import Link from '@mui/material/Link';
import clsx from 'clsx';
import axios from 'axios';

import { API_ENDPOINT } from '../../constants';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&::placeholder': {
      color: theme.palette.primary.contrastText,
    }
  },
  searchBoxHolder: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 9,
    height: 'var(--topbar-height)',
  },
  searchBox: {
    outline: 'none',
    border: 'none',
    fontSize: '1rem',
    height: 'calc(100% - 5px)',
  },
  customInputLabel: {
    '& legend': {
      width: '0px'
    }
  }
}))

const AdminSearchBox = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [numResults, setNumResults] = useState(0);

  const classes = useStyles();

  const toggle = () => {
    setOpen(!open);
  }

  const handleClose = () => {
    setOptions([]);
  };

  const onChangeHandle = async (value: string) => {
    if(value === '') {
      setOptions([]);
    }
    else {
      setQuery(value);
      const response = await axios.get(
        `${API_ENDPOINT}/meetings/search?query=${value}`
      );

      let data = response.data;
      if(data.notes.length > 0) {
        setNumResults(data.count);
        data.notes.push({ footer: true });
      }
      setOptions(data.notes);
    }
  };

  return (
    <React.Fragment>
      {!open && (
        <IconButton onClick={toggle}>
          <SearchIcon />
        </IconButton>
      )}

      {open && (
        <div
          className={clsx(
            'flex items-center',
            classes.root,
            classes.searchBoxHolder
          )}
        >
          <Autocomplete
            id="asynchronous-demo"
            fullWidth
            open={open}
            // onOpen={() => {
            //   setOpen(true);
            // }}
            // onClose={() => {
            //   setOpen(false);
            // }}
            ListboxProps={{ style: { paddingBottom: '0px' }}}
            forcePopupIcon={false}
            getOptionLabel={(option: any) => option.title}
            options={options}
            // loading={loading}
            filterOptions = {(options, state) => options}
            noOptionsText = { 'No meetings to display' }
            renderOption = {(props, option, state) => (
              <SearchResultItem
                meetingTitle={option.title}
                meetingCode={option.code}
                numResults={numResults}
                isFooter={Boolean(option.footer)}
                query={query}
                setOpenAutoComplete={setOpen}
                setAutoCompleteOpt={setOptions}
              />
            )}
            renderInput = {params => (
              <TextField
                {...params}
                className={clsx(
                  'px-4 search-box w-full',
                  classes.root,
                  classes.searchBox,
                  classes.customInputLabel
                )}
                variant="outlined"
                fullWidth
                autoFocus
                placeholder="Search Meetings"
                onChange={event => {
                  if (event.target.value !== "" || event.target.value !== null) {
                    onChangeHandle(event.target.value);
                  }
                }}
              />
            )}
          />
          <IconButton onClick={toggle} className="align-middle mx-4">
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </React.Fragment>
  );
}

export default AdminSearchBox;
