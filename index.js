const express = require('express');

const app = express();
const port = 3000;

// app.use((req, res) => {
//   console.log(`We got a new request: ${req}`);
//   console.dir(req);
//   console.log(`We respond with ${res}`);
//   console.dir(res);

//   res.send(`Hello, we got your request, this is the response`);
// });

app.get('/', (req, res) => {
  res.send('this is the homepage');
});

app.post('/cats', (req, res) => {
  res.send('post request for /cats  !!!');
})

app.get('/cats', (req, res) => {
  res.send('meow!!!');
});

app.get('/dogs', (req, res) => {
  res.send('woff!!!')
});

app.get('*', (req, res) => { // for generic bad requests this should always be the last in the list of responses
  res.send(`Page does not exist!`);
});

app.post('*', (req, res) => { // or generic bad requests this should always be the last in the list of responses
  res.send(`Page does not exist!`);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});