import { useEffect, useState } from "react"
import LoginForm from "../components/LoginForm";
import RegisterDialog from "../components/RegisterDialog";

import { useMutation } from '@tanstack/react-query';
import { getUserInfo } from '../api/userAPI';

import { getPayload } from "../utils/jwt";
import { Typography } from "@mui/material";
import UserProfile from "../components/UserProfile";

function User() {
  const [isLogin, setIsLogin] = useState(false);
  // 用户基本信息
  const [user, setUser] = useState({
    username: 'unknown'
  });

  // 注册对话框
  const [registerDialog, setRegisterDialog] = useState({
    open: false,
  });

  // header错误
  const [headerAlert, setHeaderAlert] = useState({
    type: '',
    msg: '',
  })

  // 打开对话框
  const openDialog = () => {
    setRegisterDialog({ open: true });
  }

  // 关闭对话框
  const closeDialog = () => {
    setRegisterDialog({ open: false })
  }

  const mutation = useMutation({
    mutationFn: getUserInfo,
    onSuccess: (data) => {
      if (data.errcode == 'INVALID_JWT') {
        setIsLogin(false);
        setHeaderAlert({
          type: 'warning',
          msg: 'JSON Web Token错误，请重新登录'
        });
        return;
      } else if (data.errcode == 'EXPIRED_JWT') {
        setIsLogin(false);
        setHeaderAlert({
          type: 'warning',
          msg: 'JSON Web Token已过期，请重新登录'
        });
        return;
      }

      setIsLogin(true);
      setUser(data.user);
    }
  });

  // 设定登录用户信息
  const handleLoginStatus = ({userInfo}) => {
    setIsLogin(true);
    setUser(userInfo)
  }

  // 退出登录
  const logout = () => {
    setIsLogin(false);
    window.localStorage.removeItem('token');
  }

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    if (token == undefined) return;
    const payload = getPayload(token);

    mutation.mutate({ ...payload, token });
  }, [])

  return (
    <>{mutation.isLoading ?
      <Typography>Verify user information...</Typography> :
      isLogin ?
        <UserProfile user={user} logout={logout}/> :
        <>
          <RegisterDialog dialog={registerDialog} closeDialog={closeDialog} />
          <LoginForm headerAlert={headerAlert}
            handleLoginStatus={handleLoginStatus}
            openRegisterDialog={openDialog} />
        </>
    }
    </>
  )
}

export default User