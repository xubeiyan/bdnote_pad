import express from "express";
import { userLoginValidation, userRegister } from '../database/db_operation.js';
const router = express.Router();

// index
router.get('/', (req, res) => {
  res.send('Hello World!')
});

// user login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const result = userLoginValidation({ username, password });

  let reqJSON = {
    api: 'login',
    msg: '未知错误'
  }

  if (result == 'USER_NOT_EXIST') {
    reqJSON.errcode = 'INVALID_USER_OR_PASS';
    reqJSON.msg = '用户名或密码错误';
  } else if (result == 'INVALID_PASSWORD') {
    reqJSON.errcode = 'INVALID_USER_OR_PASS';
    reqJSON.msg = '用户名或密码错误';
  } else if (result == "USER_BLOCKED") {
    reqJSON.errcode = 'USER_BLOCKED';
    reqJSON.msg = '用户已被封禁';
  } else if (result == 'LOGIN_SUCCESS') {
    reqJSON.msg = '登录成功';
  }

  res.status(200).json(reqJSON);
});

// user register
router.post('/register', (req, res) => {
  const { username, password, nickname } = req.body;
  const result = userRegister({ username, password, nickname });

  let reqJSON = {
    api: 'register',
    msg: '未知错误'
  }

  if (result == 'REGISTER_SUCCESS') {
    reqJSON.msg = '注册成功';
  } else if (result == 'USER_EXIST') {
    reqJSON.errcode = 'USER_EXIST';
    reqJSON.msg = '用户已存在';
  }

  res.status(200).json(reqJSON);
});

export default router;