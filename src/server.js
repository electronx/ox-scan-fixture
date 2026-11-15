// INTENTIONALLY INSECURE TEST FIXTURE — never run.
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { findUser, searchItems } = require('./db');
const { runReport, previewTemplate } = require('./admin');

const app = express();
app.use(express.json());

// CORS: any origin, with credentials
app.use(cors({ origin: '*', credentials: true }));

// Reflected XSS
app.get('/hello', (req, res) => {
  res.send('<h1>Hello ' + req.query.name + '</h1>');
});

// Open redirect
app.get('/login/callback', (req, res) => {
  res.redirect(req.query.next);
});

// Path traversal
app.get('/files', (req, res) => {
  fs.readFile(path.join('/var/data', req.query.name), (err, data) => res.send(data));
});
app.get('/download/:file', (req, res) => {
  res.sendFile(req.params.file);
});

// JWT: decode instead of verify, and the "none" algorithm accepted
app.get('/me', (req, res) => {
  const user = jwt.decode(req.headers.token);
  res.json(user);
});
app.get('/admin', (req, res) => {
  const claims = jwt.verify(req.headers.token, 'k', { algorithms: ['HS256', 'none'] });
  res.json(claims);
});

app.get('/users/:id', async (req, res) => res.json(await findUser(req)));
app.get('/items', async (req, res) => res.json(await searchItems(req)));
app.post('/reports', (req, res) => runReport(req, res));
app.post('/preview', (req, res) => previewTemplate(req, res));

module.exports = app;
