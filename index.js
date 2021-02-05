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


app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req= req.params;
  res.send(`<h1>Browsing subreddit ${subreddit}</h1>`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
  const { subreddit, postId } = req= req.params;
  res.send(`<h1>Browsing post ${postId} of subreddit ${subreddit}</h1>`);
})

app.post('/cats', (req, res) => {
  res.send('POST request for /cats  !!!');
})

app.get('/cats', (req, res) => {
  res.send('GET request for /cats');
});

app.get('/search', (req, res) => {
  const { q } = req.query;
  if(!q) {
    res.send(`<h1>nothing found if not searched</h1>`);
  } else {
    res.send(`<h1>search results for: ${ q }</h1>`);
  }
  
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