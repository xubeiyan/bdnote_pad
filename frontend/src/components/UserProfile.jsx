import {
  Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getPayload } from '../utils/jwt';

import { listUserCreatedNote } from '../api/noteAPI';

function UserProfile({ user, logout }) {
  const navi = useNavigate();

  // 前往新建note
  const toNewNote = () => {
    navi('/add');
  }

  const [page, setPage] = useState({
    pageNum: 1,
    pageSize: 20,
  })

  // 乐谱数据
  const [notes, setNotes] = useState([]);

  // 列出用户上传的乐谱
  const mutation = useMutation({
    mutationFn: listUserCreatedNote,
    onSuccess: (data) => {
      if (data.rows == undefined || data.rows.length == 0) {
        return;
      }

      setNotes(data.rows);
    }
  })

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    if (token == undefined) return;

    const { username } = getPayload(token);

    mutation.mutate({ username, pageNum: page.pageNum, pageSize: page.pageSize, token });
  }, [])

  return (
    <Box>
      <Typography variant='h4' sx={{
        my: `.5em`, mx: `.25em`
      }}>Hello, {user.username}</Typography>

      <Table size='small' sx={{ px: `1em` }}>
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
      <Box sx={{ my: `1em`, mx: `.5em` }}>
        <Typography variant='h5'>Note I created</Typography>
        {notes.length == 0 ?
          <Typography>There is no note you created...</Typography> :
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>note ID</TableCell>
                <TableCell>title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map(note =>
                <TableRow key={note.id}>
                  <TableCell>{note.id}</TableCell>
                  <TableCell>{note.title}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        }
      </Box>
      <Stack direction="row" justifyContent="center" gap='.5em'
        sx={{ mt: `1em` }}>
        <Button variant='contained'
          onClick={toNewNote}>Add New</Button>
        <Button variant='contained' color='warning'
          onClick={logout}>Log out</Button>
      </Stack>
    </Box>
  )
}

export default UserProfile