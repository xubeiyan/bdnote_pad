import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

import MusicNoteIcon from '@mui/icons-material/MusicNote';

import React from 'react'

function TopAppBar({ toggleMenu }) {
  return (
    <AppBar>
      <Toolbar variant='dense'>
        <IconButton sx={{ color: `white` }}>
          <MusicNoteIcon />
        </IconButton>
        <Typography>BD Note Pad</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar