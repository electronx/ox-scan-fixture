// INTENTIONALLY INSECURE TEST FIXTURE — never run.
const db = require('./pool');

// SQL injection: string concatenation and template literals
exports.findUser = (req) => db.query("SELECT * FROM users WHERE id = '" + req.params.id + "'");
exports.searchItems = (req) => db.query(`SELECT * FROM items WHERE name = '${req.query.name}'`);
