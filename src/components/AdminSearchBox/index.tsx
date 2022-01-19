import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&::placeholder': {
      color: theme.palette.primary.contrastText,
    },
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
}))

const AdminSearchBox = () => {
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const toggle = () => {
      setOpen(!open)
  }

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
          <input
            className={clsx(
              'px-4 search-box w-full',
              classes.root,
              classes.searchBox
            )}
            type="text"
            placeholder="Search here..."
            autoFocus
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
