const express = require('express');
const { writeSubmission, getSubmission } = require('./api/api');
const api = require('./api/api');

// Use environment variable if configured, otherwise use port 3000
const PORT = process.env.PORT || 3001;

// Instantiate express app
const app = express();

// parses incoming requests with JSON payloads
app.use(express.json());

app.get('/fields', (req, res) => {
  try {
    const fields = api.getFields();
    res.json(fields);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/submit', (req, res) => {
  writeSubmission(req.body.data);
  res.json({ message: 'Success' });
});

app.get('/thank-you', async (req, res) => {
  const submission = await getSubmission();
  res.json(submission);
});

// Run Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
