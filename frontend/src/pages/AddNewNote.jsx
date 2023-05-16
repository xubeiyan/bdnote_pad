import { Box, Breadcrumbs, Button, IconButton, Link, Stack, TextField, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { newNote } from '../api/noteAPI';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { getPayload } from '../utils/jwt';

function AddNewNote() {
  const navi = useNavigate();

  // note
  const [note, setNote] = useState({
    title: '',
    author: '',
    category: '',
    content: '',
    comment: '',
  });

  // update
  const updateNote = (field, value) => {
    setNote(note => ({
      ...note,
      [field]: value,
    }))
  }

  // 错误信息
  const [headerAlert, setHeaderAlert] = useState({
    type: '',
    msg: '',
  })

  // 返回
  const backNavi = () => {
    navi('/user');
  }

  const mutation = useMutation({
    mutationFn: newNote,
    onSuccess: (data) => {
      if (data.errcode == 'NO_TITLE') {
        setHeaderAlert({
          type: 'warning',
          msg: 'note title required',
        });
        return;
      }

      setHeaderAlert({
        type: 'success',
        msg: 'note saved, back in 5 second'
      })

      navi('/user');
    }
  });

  // 乐谱
  const submit = () => {
    let token = window.localStorage.getItem('token');
    if (token == undefined) return;

    const { username } = getPayload(token);

    mutation.mutate({ ...note, username, token });
  }

  return (
    <Box>
      {headerAlert.type != '' ?
        <Alert severity={headerAlert.type} >{headerAlert.msg}</Alert>
        : null}
      <Stack direction="row" alignItems="center">
        <IconButton onClick={backNavi}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs separator=">">
          <Link underline='hover' key="1"
            color="inherit" href="/user">User</Link>
          <Link underline='hover' key="2"
            color="text.primary" href="/add">Add New</Link>
        </Breadcrumbs>
      </Stack>
      <Stack gap=".5em">
        <TextField size='small' variant='outlined' label="note title"
          value={note.title}
          onChange={e => updateNote('title', e.target.value)} />
        <TextField size='small' variant='outlined' label="note content" multiline
          minRows={2} maxRows={10}
          value={note.content}
          onChange={e => updateNote('content', e.target.value)} />
      </Stack>
      <Stack direction="row" sx={{ mt: `1em` }} justifyContent="center">
        <Button variant='contained' onClick={submit} >Submit</Button>
      </Stack>
    </Box>
  )
}

export default AddNewNote