import { Alert, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { register } from '../api/userAPI';

function RegisterDialog({ dialog, closeDialog }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirm: '',
    nickname: '',
  });

  const [err, setErr] = useState({
    username: {
      error: false,
      text: '',
    },
    password: {
      error: false,
      text: '',
    },
    confirm: {
      error: false,
      text: '',
    },
  });

  // 返回结果
  const [resTip, setResTip] = useState({
    type: '',
    msg: ''
  })

  const updateField = (field, value) => {
    setErr(err => ({
      ...err,
      [field]: { error: false, text: '' },
    }));

    setForm(form => ({
      ...form,
      [field]: value,
    }));

    emptyResTip();
  }

  // 清空返回消息
  const emptyResTip = () => {
    setResTip({ type: '', msg: '' });
  }

  // 验证输入数据
  const validate = () => {
    let flag = false;
    // 验证用户名是否为空
    if (form.username == '') {
      setErr(helper => ({
        ...helper,
        username: { error: true, text: 'Please input username' },
      }));
      flag = true;
    }

    // 验证密码是否为空
    if (form.password == '') {
      setErr(helper => ({
        ...helper,
        password: { error: true, text: 'Please input password' },
      }));
      flag = true;
    }

    // 验证确认密码是否为空
    if (form.confirm == '') {
      setErr(helper => ({
        ...helper,
        confirm: { error: true, text: 'Please input confirm password' },
      }));
      flag = true;
    }

    // 验证两个密码是否相同
    if (form.password != form.confirm) {
      setErr(helper => ({
        ...helper,
        password: { error: true, text: 'Not same as confirm password' },
        confirm: { error: true, text: 'Not same as passwod' },
      }));
      flag = true;
    }

    if (flag) return;

    // 执行注册mutation
    mutation.mutate({
      username: form.username,
      password: form.password,
      nickname: form.nickname,
    });
  }

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (resJSON) => {
      if (resJSON.errcode == 'USER_EXIST') {
        setErr(err => ({
          ...err,
          username: { error: true, text: 'This username already exists' },
        }));
        setResTip({
          type: 'error',
          msg: 'This username already exists'
        });
        return;
      }

      setResTip({
        type: 'success',
        msg: 'Register success! Dialog close in 5 seconds...'
      });

      setTimeout(() => {
        closeDialog();
      }, 5000);
    },
  });

  useEffect(() => {
    if (dialog.open) return;
    emptyResTip();
  }, [dialog.open])

  return (
    <Dialog open={dialog.open} onClose={closeDialog}>
      <DialogTitle>Register</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField variant='outlined' size='small' fullWidth
              error={err.username.error} helperText={err.username.text}
              label="Username" value={form.username}
              onChange={e => updateField('username', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant='outlined' size='small' fullWidth
              error={err.password.error} helperText={err.password.text}
              label="Password" value={form.password}
              type='password'
              onChange={e => updateField('password', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant='outlined' size='small' fullWidth
              error={err.confirm.error} helperText={err.confirm.text}
              label="Confirm Password" value={form.confirm}
              type='password'
              onChange={e => updateField('confirm', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant='outlined' size='small' fullWidth
              label="Nickname(optional)" value={form.nickname}
              onChange={e => updateField('nickname', e.target.value)} />
          </Grid>
          {resTip.type != '' ?
            <Grid item xs={12}>
              <Alert severity={resTip.type}>{resTip.msg}</Alert>
            </Grid>
            : null}
        </Grid>
        <Stack direction="row" justifyContent="end" gap='1em'
          sx={{ mt: `1em` }}>
          <Button variant='contained' size='small'
            onClick={validate}>Register</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default RegisterDialog