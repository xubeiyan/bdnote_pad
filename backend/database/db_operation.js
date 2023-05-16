import db from './db.js';
import { genRandomString, hashString, safeEqual } from '../utils/crypto.js';

// 用户登录
const userLoginValidation = ({ username, password }) => {
  const stmt = db.prepare(
    'SELECT `password`, `password_salt`, `disabled` FROM `user` WHERE `username` = ? LIMIT 1'
  ).bind(username);

  const info = stmt.get();

  // 没有此用户
  if (info == undefined) {
    return 'USER_NOT_EXIST';
  }

  // 用户已禁用
  if (info.disabled == 1) {
    return 'USER_BLOCKED';
  }

  // 核对密码
  const passwordHash = hashString({
    text: password, salt: info.password_salt
  });

  if (!safeEqual(info.password, passwordHash)) {
    return 'INVALID_PASSWORD';
  }

  return 'LOGIN_SUCCESS';

}

// 获取用户信息
const getUserInformation = ({ username }) => {
  const stmt = db.prepare(
    'SELECT `username`, `nickname` FROM `user` WHERE `username` = ? LIMIT 1'
  ).bind([username]);

  const info = stmt.get();

  if (info == undefined) {
    return {
      username: 'unknown',
      nickname: 'unkoown'
    }
  }

  return { ...info };
}

// 用户注册
const userRegister = ({ username, password, nickname }) => {
  const userExistStmt = db.prepare(`
    SELECT 1 FROM 'user' WHERE username = ? LIMIT 1
  `).bind([username]);

  const existInfo = userExistStmt.get();

  if (existInfo != undefined) {
    return 'USER_EXIST';
  }

  // 密码哈希
  const passwordSalt = genRandomString({ length: 16 });
  const passwordHash = hashString({
    text: password, salt: passwordSalt
  });

  // 检查nickname
  if (nickname == undefined || nickname == null) {
    nickname = '';
  }

  const stmt = db.prepare(
    `INSERT INTO 'user' 
    (username, password, password_salt, nickname) VALUES
    (?, ?, ?, ?)`
  ).bind([username, passwordHash, passwordSalt, nickname]);

  const info = stmt.run();

  console.log(info);
  return 'REGISTER_SUCCESS';
}

// 添加乐谱
const addNote = ({ title, content, author, comment, category, upload_user }) => {
  const addNoteStmt = db.prepare(`
    INSERT INTO 'note' 
    (title, content, author, comment, category, upload_user) VALUES
    (?, ?, ?, ?, ?, ?)
  `).bind([title, content, author, comment, category, upload_user]);

  const info = addNoteStmt.run();

  return 'ADD_NOTE_SUCCESS';
}

// 获取乐谱
const getNoteList = ({ username, pageSize, pageNum }) => {
  let limit = parseInt(pageSize);
  let offset = parseInt((pageNum - 1) * pageSize);
  let getNoteListStmt;
  if (username == undefined) {
    getNoteListStmt = db.prepare(`
    SELECT id, title FROM 'note' LIMIT ? OFFSET ?
    `).bind([limit, offset])
  } else {
    getNoteListStmt = db.prepare(`
    SELECT id, title FROM 'note' WHERE upload_user = ? LIMIT ? OFFSET ?
    `).bind([username, limit, offset])
  }

  const noteInfo = getNoteListStmt.all();

  if (noteInfo == undefined) {
    return [];
  }

  return noteInfo;
}

export { userLoginValidation, getUserInformation, userRegister, addNote, getNoteList }