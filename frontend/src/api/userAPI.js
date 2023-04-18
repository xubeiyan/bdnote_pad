const login = async ({ username, password }) => {
  return await fetch('/api/login', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      username, password
    })
  }).then(res => res.json());
}

const register = async ({username, password, nickname}) => {
  return await fetch('/api/register', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      username, password, nickname
    })
  }).then(res => res.json());
}

// 获取用户信息
const getUserInfo = async ({username, token}) => {
  return await fetch('/api/getUserInfo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'post',
    body: JSON.stringify({
      username,
    })
  }).then(res => res.json());
}

// 重新申请token
const renewToken = async ({username, token}) => {
  return await fetch('/api/renewToken', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'post',
    body: JSON.stringify({
      username,
    })
  }).then(res => res.json());
}

export { login, register, getUserInfo };