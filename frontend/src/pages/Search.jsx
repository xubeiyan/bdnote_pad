import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

function Search() {
  return (
    <Box>
      <Stack alignItems="center">
        <Typography variant='h4' sx={{ my: `2em` }}>Search Music Note...</Typography>
        <TextField variant='standard' fullWidth
          placeholder='Song Name, Author, Difficulty, ...' />
        <Button sx={{ mt: `1em` }} variant='contained'>Start Search</Button>
      </Stack>
    </Box>
  )
}

export default Search