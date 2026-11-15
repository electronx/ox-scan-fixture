// INTENTIONALLY INSECURE TEST FIXTURE — never run.
const { exec, spawn } = require('child_process');
const cp = require('child_process');
const vm = require('vm');

// Command injection
exports.runReport = (req, res) => {
  exec('generate-report ' + req.body.month, (err, out) => res.send(out));
};
exports.tail = (req) => cp.execSync(`tail -n 50 ${req.params.file}`);
// Shell enabled for a child process
exports.archive = () => spawn('tar', ['czf', 'backup.tgz', 'data'], { shell: true });

// Code injection
exports.previewTemplate = (req, res) => {
  const result = eval(req.body.expression);
  res.send(String(result));
};
exports.plugin = (req) => new Function(req.body.code);
exports.sandbox = (req) => vm.runInNewContext(req.query.src);
