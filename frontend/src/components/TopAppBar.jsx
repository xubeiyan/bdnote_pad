import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import React from 'react'

function TopAppBar({ toggleMenu }) {
  return (
    <AppBar>
      <Toolbar variant='dense'>
        <IconButton sx={{ color: `white` }}
          onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>
        <Typography
          sx={{ pl: `.5em` }}>BD Note Pad</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar