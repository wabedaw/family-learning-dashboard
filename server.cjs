const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const BASE = '/family-learning-dashboard';

app.use(BASE, express.static(path.join(__dirname, 'dist'), {
  maxAge: '1h',
  etag: true,
}));

app.get('/', (req, res) => {
  res.redirect(302, BASE + '/');
});

app.use(BASE, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Family Dashboard running on port ${PORT}`);
});
