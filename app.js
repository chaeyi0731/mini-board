// app.js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'front')));

app.get('/', (req, res) => {
  // 게시물 목록 가져오기
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) throw err;
    res.sendFile(path.join(__dirname, 'front', 'index.html'));
  });
});

app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  // 특정 게시물 가져오기
  db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) throw err;
    const post = results[0];
    res.send(`
      <h1>${post.title}</h1>
      <p>${post.content}</p>
      <a href="/">홈으로 돌아가기</a>
    `);
  });
});

app.post('/create', (req, res) => {
  // 게시물 작성 처리
  const { title, content } = req.body;
  const post = { title, content };

  db.query('INSERT INTO posts SET ?', post, (err, result) => {
    if (err) throw err;
    console.log('게시물이 성공적으로 작성되었습니다.');
    res.redirect('/');
  });
});
app.get('/posts', (req, res) => {
  // 게시물 목록 가져오기
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) throw err;
    res.json(results); // JSON 형태로 응답
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
