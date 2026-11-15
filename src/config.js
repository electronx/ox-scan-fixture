// INTENTIONALLY INSECURE TEST FIXTURE — never run. All credentials are fake.
// AWS's documented example key (not a real credential):
const awsKey = 'AKIAIOSFODNN7EXAMPLE';
const pem = '-----BEGIN RSA PRIVATE KEY-----\nMIIfake\n-----END RSA PRIVATE KEY-----';

module.exports = {
  awsKey,
  pem,
  dbPassword: 'hunter2-placeholder',
  // TLS verification disabled
  tls: { rejectUnauthorized: false },
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
