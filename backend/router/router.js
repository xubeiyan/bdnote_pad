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

  let resJSON = {
    api: 'login',
    msg: '未知错误'
  }

  if (result == 'USER_NOT_EXIST') {
    resJSON.errcode = 'INVALID_USER_OR_PASS';
    resJSON.msg = '用户名或密码错误';
  } else if (result == 'INVALID_PASSWORD') {
    resJSON.errcode = 'INVALID_USER_OR_PASS';
    resJSON.msg = '用户名或密码错误';
  } else if (result == "USER_BLOCKED") {
    resJSON.errcode = 'USER_BLOCKED';
    resJSON.msg = '用户已被封禁';
  } else if (result == 'LOGIN_SUCCESS') {
    // token过期时间，不传为30分钟
    resJSON.token = genJWT({ username, expireTime: 60 * 30});
    resJSON.user = getUserInformation({ username })
    resJSON.msg = '登录成功';
  }

  res.status(200).json(resJSON);
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

// 获取当前用户信息
router.post('/getUserInfo', (req, res) => {
  const { username } = req.body;
  const token = req.headers.authorization;

  const resJSON = verifyToken({username, token});

  if (resJSON.errcode != undefined) {
    res.status(200).json(resJSON);
  }

  resJSON.user = getUserInformation({ username });

  res.status(200).json(resJSON);
});

// 验证token
const verifyToken = ({username, token}) => {
  let reqJSON = {
    api: 'getUserInfo',
    msg: '未知错误',
  }

  const result = verifyJWT(token);

  // 如果验证不通过
  if (result == 'FORMAT_WRONG_JWT') {
    reqJSON.errcode = 'FORMAT_WRONG_JWT';
    reqJSON.msg = '错误格式的JWT';
  } else if (result == 'INVAILD_JWT') {
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

  return reqJSON;
}

export default router;