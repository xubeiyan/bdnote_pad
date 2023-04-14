import { Alert, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { login } from '../api/userAPI';

function LoginForm({ openRegisterDialog, setIsLogin }) {
  // 登录所需用户名和密码
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  // 错误
  const [err, setErr] = useState({
    type: '',
    msg: '',
  })

  // 改变值
  const handleInputChange = (field, value) => {
    setLoginForm(loginForm => ({
      ...loginForm,
      [field]: value,
    }));
    setErr({ type: '', msg: '' });
  }

  // 登录
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (resJSON) => {
      if (resJSON.errcode == 'INVALID_USER_OR_PASS') {
        setErr({ type: 'error', msg: 'Invalid username or password', });
        return;
      } else if (resJSON.errcode == 'USER_BLOCKED') {
        setErr({ type: 'warning', msg: 'User is blocked' });
        return;
      }

      setIsLogin(true);
    },
  })

  return (
    <Box sx={{ m: `.5em` }}>
      <Typography variant='h4'
        sx={{ mt: `2em`, mb: `1em`, textAlign: 'center' }}>Log in</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField size="small" variant='outlined' label="username"
            fullWidth value={loginForm.username}
            onChange={e => handleInputChange('username', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField size="small" variant='outlined' label="password"
            fullWidth value={loginForm.password} type='password'
            onChange={e => handleInputChange('password', e.target.value)} />
        </Grid>
        {err.type != '' ?
          <Grid item xs={12}>
            <Alert severity={err.type}>{err.msg}</Alert>
          </Grid>
          : null}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <Button variant='contained'
              onClick={() => { mutation.mutate(loginForm) }}>Login</Button>
          </Stack>
        </Grid>
        <Grid item>
          <Typography>Without an account?
            <Button onClick={openRegisterDialog}>register</Button>
          </Typography>
          <Typography>You can upload your own BD note after logging</Typography>
        </Grid>
      </Grid>
    </Box >
  )
}

export default LoginForm