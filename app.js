const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'mydatabase',
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ' + err.stack);
    return;
  }
  console.log('MySQL 연결 성공');
});

// 게시물 목록 가져오기
app.get('/', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 게시물 작성 폼
app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname + 'front', 'index.html'));
});

// 게시물 작성 처리
app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const post = { title, content };

  db.query('INSERT INTO posts SET ?', post, (err, result) => {
    if (err) throw err;
    console.log('게시물이 성공적으로 작성되었습니다.');
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
