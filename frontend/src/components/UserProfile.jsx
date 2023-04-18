import { Box, Button, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'


function UserProfile({ user, logout }) {
  return (
    <Box>
      <Typography variant='h4' sx={{
        my: `.5em`, mx: `.25em`
      }}>Hello, {user.username}</Typography>
      <Table size='small' sx={{ px: `1em`}}> 
        <TableBody>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>{user.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nickname</TableCell>
            <TableCell>{user.nickname}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Stack direction="row" justifyContent="center"
        sx={{ mt: `1em` }}>
        <Button variant='contained' color='warning'
        onClick={logout}>Log out</Button>
      </Stack>
    </Box>
  )
}

export default UserProfile