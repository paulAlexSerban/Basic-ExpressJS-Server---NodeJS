const express = require('express');
const path = require('path');
const methodOverride = require('method-override')
const app = express();
const port = 3000;

const {v4: uuid } = require('uuid');
uuid();

app.use(express.urlencoded({extended: true})); // this is needed to parse post requests, without it post requests body is `undefined`

app.use(express.json()); // this is needed to parse json payloads
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use((req, res) => {
//   console.log(`We got a new request: ${req}`);
//   console.dir(req);
//   console.log(`We respond with ${res}`);
//   console.dir(res);

//   res.send(`Hello, we got your request, this is the response`);
// });

let comments = [
  {
    id: uuid(),
    username: 'Tod',
    comment: 'Lorem test comment, this is funny.'
  },
  {
    id: uuid(),
    username: 'Skyler',
    comment: 'Lorem test comment, this is funny.'
  },
  {
    id: uuid(),
    username: 'SkBerBoi',
    comment: 'TOddy doddy, tests, info lorem comment.'
  },
  {
    id: uuid(),
    username: 'onlysaywoof',
    comment: 'Woof woof wof wooooooof lorem test comment, this is funny.'
  },
  {
    id: uuid(),
    username: 'Toddddd',
    comment: 'Lorem bingo test comment, kingston this is funny.'
  }
]

app.get('/', (req, res) => {
  res.send('this is the homepage');
});

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
})

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({username, comment, id:uuid()});
  res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/show', { comment });
})

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find(c => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter(c => c.id !== id);
  res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/edit', { comment });

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
  console.log(req.body);
  const { kitty, qty } = req.body;
  res.send(`POST request for /cats  !!! is ${kitty} and ${qty}`);
})

app.get('/cats', (req, res) => {
  console.log(req);
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