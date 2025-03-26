const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

require('dotenv').config();
const saltRounds = 10;
const PORT = 3000;
const db = new sqlite3.Database('./database.db');

const SECRET_KEY= process.env.SECRET_KEY;



// 인증 미들웨어
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('인증 헤더 없음');
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => { // 여기서 secretKey -> SECRET_KEY
        if (err) return res.status(401).send('토큰 검증 실패');
        req.user = decoded;
        next();
    });
}


// 회원가입
app.post('/users', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("이메일과 비밀번호를 입력해주세요.");
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) return res.status(500).send("비밀번호 해싱 오류");
        const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
        db.run(sql, [email, hashedPassword], function (err) {
            if (err) return res.status(500).send("데이터베이스 오류: " + err.message);
            res.status(201).send({ id: this.lastID, email });
        });
    });
});

// 로그인
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("이메일과 비밀번호를 입력해주세요");
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, user) => {
        if (err) return res.status(500).send("DB 오류: " + err.message);
        if (!user) return res.status(404).send("이메일이 존재하지 않습니다");
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return res.status(500).send("비밀번호 확인 오류");
            if (!result) return res.status(401).send("비밀번호가 틀립니다");
            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            res.send({ message: "로그인 성공!", token });
        });
    });
});

// 글 작성 (유저 ID 포함)
app.post("/articles", authMiddleware, (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    db.run(
        `INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)`,
        [title, content, userId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, content, user_id: userId });
        }
    );
});

// 전체 글 목록 (유저 email 포함)
app.get('/articles', (req, res) => {
    const sql = `SELECT articles.*, users.email FROM articles 
                 JOIN users ON articles.user_id = users.id`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 개별 글 조회 (유저 email 포함)
app.get('/articles/:id', (req, res) => {
    const sql = `SELECT articles.*, users.email FROM articles 
                 JOIN users ON articles.user_id = users.id 
                 WHERE articles.id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Article not found" });
        res.json(row);
    });
});

// 댓글 작성 (유저 ID 포함)
app.post("/articles/:id/comments", authMiddleware, (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;
    const createdAt = new Date().toISOString();
    const sql = `INSERT INTO comments (content, created_at, article_id, user_id) VALUES (?, ?, ?, ?)`;
    db.run(sql, [content, createdAt, req.params.id, userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            id: this.lastID, content, created_at: createdAt, article_id: req.params.id, user_id: userId
        });
    });
});

// 특정 글의 댓글 목록 (유저 email 포함)
app.get("/articles/:id/comments", (req, res) => {
    const sql = `SELECT comments.*, users.email FROM comments 
                 JOIN users ON comments.user_id = users.id 
                 WHERE comments.article_id = ?`;
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

app.get('/logintest', authMiddleware,(req, res)=>{
  console.log(req.headers.authorization.split(' ')[1])
  let token = req.headers.authorization.split(' ')[1]


  jwt.verify(token, SECRET_KEY, (err, decoded)=>{
    if(err){
      return res.send("에러!!!")
    }

    return res.send('로그인 성공!')

  })
})

// 글 수정 (유저 ID 포함)
app.put("/articles/:id", authMiddleware, (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    const articleId = req.params.id;

    // 해당 글이 존재하는지 확인
    const checkSql = `SELECT * FROM articles WHERE id = ? AND user_id = ?`;
    db.get(checkSql, [articleId, userId], (err, article) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!article) return res.status(404).json({ message: "글이 존재하지 않거나 수정 권한이 없습니다." });

        // 글 수정
        const updateSql = `UPDATE articles SET title = ?, content = ? WHERE id = ?`;
        db.run(updateSql, [title, content, articleId], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "글 수정 성공", id: articleId, title, content });
        });
    });
});

