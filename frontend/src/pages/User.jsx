import { useState } from "react"
import LoginForm from "../components/LoginForm";
import RegisterDialog from "../components/RegisterDialog";



function User() {
  const [isLogin, setIsLogin] = useState(false);

  // 注册对话框
  const [registerDialog, setRegisterDialog] = useState({
    open: false,
  });

  // 打开对话框
  const openDialog = () => {
    setRegisterDialog({ open: true });
  }

  // 关闭对话框
  const closeDialog = () => {
    setRegisterDialog({ open: false })
  }

  return (
    <>
      {isLogin ? null :
        <LoginForm openRegisterDialog={openDialog} setIsLogin={setIsLogin} />}
      <RegisterDialog dialog={registerDialog} closeDialog={closeDialog} />
    </>
  )
}

export default User