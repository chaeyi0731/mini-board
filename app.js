// app.js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db');

// express에 미들웨어를 추가한다.
// extended: true인 경우, 해석된 데이터는 객체 또는 배열 형태로 표현된다.
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'front')));

app.get('/', (req, res) => {
  // 게시물 목록 가져오기
  //  'posts' 테이블로부터 모든 데이터를 선택하는 쿼리를 실행하는 부분
  // SELECT * FROM posts 이 부분은 SQL SELECT 쿼리
  // posts 테이블에서 모든 열(*은 모든 열을 나타냄)을 선택하라는 의미
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) throw err;
    res.sendFile(path.join(__dirname, 'front', 'index.html'));
  });
});

// /post/:id 경로로 들어오는 GET 요청을 처리한다.
// id 부분은 동적인 것으로 숫자다 다른 다른 값으로 대체 될 수 있음
// 이 부분을 통해 특정 게시물의 ID를 받아온다.

app.get('/post/:id', (req, res) => {
  // 이 부분은 요청(request) 객체인 req에서 동적인 파라미터인 id를 추출하여 postId 변수에 할당한다. 이로써 어떤 게시물의 정보를 가져올 지 결정

  //이 부분은 플레이스 홀더에 값을 넣는 방법입니다. 배열 형태로 넣게 된다.
  // postId 변수 값이 ? 자리에 들어간다.
  const postId = req.params.id;
  // 특정 게시물 가져오기

  //mysql 테이블에서 모든 열 * 이건 모든 열을 의미한다.
  // 모든 열을 선택하되 조건은 id가 특정 값인 경우 여기서 ?눈 플레이스홀더로 나중에 실제값으로 대체된다.
  //플레이스 홀더 = sql 쿼리에 변수를 사용되는 특별한 문법
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

  // 요청에서 전송된 데이터를 받아와서 title과 content 를 추출 
  //  클라이언트에서 HTML 폼을 통해 POST 요청이 올 때, 해당 폼의 입력 값들이 req.body에 담겨 온다.
  const { title, content } = req.body;

  // 추출한 title과 content를 사용하여 새로운 게시물 객체를 생성합니다. 이 객체는 데이터베이스에 저장될 내용을 담고 있다.
  const post = { title, content };

  //데이터베이스에 새로운 게시물을 추가하는 SQL 쿼리를 실행
  db.query('INSERT INTO posts SET ?', post, (err, result) => {
    if (err) throw err;
    console.log('게시물이 성공적으로 작성되었습니다.');
    res.redirect('/');
    //게시물이 성공적으로 작성 되면 사용자를 홈페이지 "/"" 초기화면으로 보낸다.
  });
});
app.get('/posts', (req, res) => {
  // 게시물 목록 가져오기

  // 'posts' 테이블에서 모든 열을 선택하는 쿼리
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) throw err;
    res.json(results); // JSON 형태로 응답
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
