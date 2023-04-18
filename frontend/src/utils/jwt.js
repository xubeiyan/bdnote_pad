// 从JSON Web Token里获取当前用户
const getPayload = (jwtStr) => {
  let base64Url = jwtStr.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(window.atob(base64));
}

export { getPayload }