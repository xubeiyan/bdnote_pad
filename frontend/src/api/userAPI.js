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

// 验证token
const verifyToken = async ({username, token}) => {
  return await fetch('/api/verifyToken', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      username,
      token,
    })
  }).then(res => res.json());
}

// token
const renewToken = async ({username, token}) => {
  return await fetch('/api/renewToken', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      username,
      token,
    })
  }).then(res => res.json());
}

export { login, register, verifyToken };