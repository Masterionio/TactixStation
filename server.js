const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`TactixStation server running at http://localhost:${port}`);
});
