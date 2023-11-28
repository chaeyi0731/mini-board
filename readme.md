My SQL을 써서 간단하게 미니 게시판을 만들어 보자.

1. SQL 다운 받기 (Mac os)

- homebrew가 설치되어 있어야 한다.
  내 컴퓨터에 homebrew 설치되었는지 확인하려면?
  터미널에 brew -v 명령어 입력하여 버전 정보가 나오면 된다

- brew install mysql 해당 명령어로 sql을 다운 받는다.

- my SQL 실행
  mysql.server start

-my SQL을 시작 후 기본 설정을 시작한다.
mysql_secure_installation

- 순서대로 아래 질문들이 나오면 y 또는 n을 입력하여 설정해준다.

비밀번호 복잡도 검사 과정 (n)
비밀번호 입력 & 확인
익명 사용자 삭제 (y)
원격 접속 허용하지 않을 것인가? (y)
test DB 삭제 (n)
previlege 테이블을 다시 로드할 것인지 (y)
설정을 마치면 All done! 메세지가 출력된다.

2. 사용하기

다음 명령어를 입력하면 MySQL을 사용할 수 있다.

mysql -u root -p

2. node.js에서 조작 할 수 있도록 패키지를 다운 받는다.
   npm install mysql

3. node.js 에서 서버 작성

4. html 파일 작성 - 연결 확인

? nodemon 써보기

nodemon : 파일 변경을 감지하고 자동으로 서버를 다시 시작해주는 기능

npm install nodemon

node app.js 대신 쓸 수가 있다.

매번 node를 쓰지 않아도 된다.

추가 설정

MySQL 서버가 재부팅 상관없이 켜져있게 한다.
brew services start mysql

작업 진행

1-1 MySQL 접속
mysql -u root -p

1-2 데이터 베이스 생성
CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

1-3 테이블 생성
