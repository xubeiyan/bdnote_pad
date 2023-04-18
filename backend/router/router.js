import express from "express";
import {
  userLoginValidation,
  getUserInformation,
  userRegister
} from '../database/db_operation.js';

import { genJWT, verifyJWT } from "../utils/jwt.js";
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
    reqJSON.token = genJWT({ username, expireTime: 60 * 30 });
    reqJSON.user = getUserInformation({ username })
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

// 验证token
router.post('/verifyToken', (req, res) => {
  const { username, token } = req.body;

  let reqJSON = {
    api: 'verifyToken',
    msg: '未知错误',
  }

  const result = verifyJWT(token);

  // 如果验证不通过
  if (result == 'INVAILD_JWT') {
    reqJSON.errcode = 'INVALID_JWT';
    reqJSON.msg = '错误的JSON Web Token';
  } else if (result == 'EXPIRED_JWT') {
    reqJSON.errcode = 'EXPIRED_JWT';
    reqJSON.msg = 'JSON Web Token已过期';
  } else if (result[0] == 'VERIFIED' && result[1] !== username) {
    reqJSON.errcode = 'INVALID_USERNAME';
    reqJSON.msg = 'JSON Web Token用户名不一致';
  } else {
    reqJSON.msg = '正确的JSON Web Token';
  }

  res.status(200).json(reqJSON);
});

export default router;