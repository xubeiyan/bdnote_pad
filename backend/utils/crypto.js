import crypto from 'crypto';

// 生成随机salt
const genRandomString = ({ length }) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex').slice(0, length);
}

// 生成hash
const hashString = ({ text, salt }) => {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(text);

  return hash.digest('hex');
}

// 时间安全的相等
const safeEqual = (a, b) => {
  const a_buffer = Buffer.from(a, 'utf8');
  const b_buffer = Buffer.from(b, 'utf8');

  if (a_buffer.length == b_buffer.length &&
    crypto.timingSafeEqual(a_buffer, b_buffer)) {
    return true;
  }
  return false;
}

export { genRandomString, hashString, safeEqual }