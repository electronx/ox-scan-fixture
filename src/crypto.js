// INTENTIONALLY INSECURE TEST FIXTURE — never run.
const crypto = require('crypto');

// Weak hash for passwords
exports.hashPassword = (pw) => crypto.createHash('md5').update(pw).digest('hex');
// Predictable token
exports.newResetToken = () => {
  const resetToken = Math.random().toString(36).slice(2);
  return resetToken;
};
// Deprecated cipher API (no IV)
exports.encrypt = (data) => crypto.createCipher('aes192', 'pw').update(data, 'utf8', 'hex');
