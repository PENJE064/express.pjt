const express = require('express');
const app = express();
// json으로 된 post의 바디를 읽기 위해 필요
app.use(express.json())
const cors = require('cors');
app.use(cors());
const PORT = 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  });

app.post("/articles",(req,res)=>{
    console.log(req.body)
    let {title, content} = req.body

    db.run(`INSERT INTO articles (title, content) VALUES (?, ?)`,
        [title, content],
        function(err) {
          if (err) {
            return res.status(500).json({error: err.message});
          }
          res.json({id: this.lastID, title, content});
        });
})