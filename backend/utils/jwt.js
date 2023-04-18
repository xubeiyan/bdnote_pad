import { Buffer } from 'buffer';
import crypto from 'crypto';

// JWT的secret
const secret = 'bdnotepad20230414';

// 生成JSON Web Token，参数分别为用户名和过期时间单位秒，默认为30分钟
const genJWT = ({ username, expireTime = 60 * 30 }) => {

  const header = {
    "alg": "HS256",
    "typ": "JWT"
  }

  const payload = {
    "username": username,
    "expire": new Date().getTime() + expireTime * 1000,
  }

  const headerStr = JSON.stringify(header);
  const payloadStr = JSON.stringify(payload);

  const headerBase64url = Buffer.from(headerStr).toString('base64url');
  const payloadBase64url = Buffer.from(payloadStr).toString('base64url');

  const verify = crypto.createHmac('SHA256', secret).update(headerBase64url +
    '.' + payloadBase64url).digest('base64url');

  return `${headerBase64url}.${payloadBase64url}.${verify}`;
}

// 验证JSON web token合法性
const verifyJWT = (jwt) => {
  const [
    headerBase64url, payloadBase64url, toVerifySignature
  ] = jwt.split('.');

  const produceSignature = crypto.createHmac('SHA256', secret).update(headerBase64url +
    '.' + payloadBase64url).digest('base64url');
  
  // 如果签名验证不通过
  if (produceSignature !== toVerifySignature) {
    return 'INVAILD_JWT';
  }

  const payload = JSON.parse(Buffer.from(
    payloadBase64url, 'base64').toString('utf8'));

  const expireDate = new Date(payload.expire);
  const nowDate = new Date();

  // 如果超过了过期时间
  if (expireDate < nowDate) {
    return 'EXPIRED_JWT';
  }

  let username = payload.username;

  return ['VERIFIED', username];

}

export { genJWT, verifyJWT }
