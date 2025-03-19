const express = require('express');
const app = express();

// json으로 된 post의 바디를 읽기 위해 필요
app.use(express.json())


const cors = require('cors');
app.use(cors());

const PORT = 3000;

const users =  [
    {
      "id": 1,
      "name": "홍길동",
      "email": "hong@example.com",
      "signup_date": "2023-03-18T12:00:00Z"
    },
    {
      "id": 2,
      "name": "김철수",
      "email": "kim@example.com",
      "signup_date": "2023-02-17T09:30:00Z"
    },
    {
      "id": 3,
      "name": "이영희",
      "email": "lee@example.com",
      "signup_date": "2022-11-16T15:20:00Z"
    },
    {
      "id": 4,
      "name": "박준호",
      "email": "park@example.com",
      "signup_date": "2022-10-15T10:10:00Z"
    },
    {
      "id": 5,
      "name": "최민수",
      "email": "choi@example.com",
      "signup_date": "2022-09-14T18:45:00Z"
    },
    {
      "id": 6,
      "name": "정다은",
      "email": "jung@example.com",
      "signup_date": "2022-08-13T14:00:00Z"
    },
    {
      "id": 7,
      "name": "김지수",
      "email": "kim2@example.com",
      "signup_date": "2022-07-12T11:30:00Z"
    },
    {
      "id": 8,
      "name": "이수민",
      "email": "lee2@example.com",
      "signup_date": "2022-06-11T17:15:00Z"
    },
    {
      "id": 9,
      "name": "박지현",
      "email": "park2@example.com",
      "signup_date": "2022-05-10T08:40:00Z"
    },
    {
      "id": 10,
      "name": "최지우",
      "email": "choi2@example.com",
      "signup_date": "2022-04-09T20:00:00Z"
    }
  ]
  
  
const articles = [
    {
      "id": 1,
      "title": "첫 번째 게시글 제목",
      "content": "첫 번째 게시글 내용입니다.",
      "author_id": 1,
      "date": "2025-03-18T12:00:00Z"
    },
    {
      "id": 2,
      "title": "두 번째 게시글 제목",
      "content": "두 번째 게시글 내용입니다.",
      "author_id": 2,
      "date": "2025-03-17T09:30:00Z"
    },
    {
      "id": 3,
      "title": "세 번째 게시글 제목",
      "content": "세 번째 게시글 내용입니다.",
      "author_id": 3,
      "date": "2025-03-16T15:20:00Z"
    },
    {
      "id": 4,
      "title": "네 번째 게시글 제목",
      "content": "네 번째 게시글 내용입니다.",
      "author_id": 4,
      "date": "2025-03-15T10:10:00Z"
    },
    {
      "id": 5,
      "title": "다섯 번째 게시글 제목",
      "content": "다섯 번째 게시글 내용입니다.",
      "author_id": 5,
      "date": "2025-03-14T18:45:00Z"
    },
    {
      "id": 6,
      "title": "여섯 번째 게시글 제목",
      "content": "여섯 번째 게시글 내용입니다.",
      "author_id": 6,
      "date": "2025-03-13T14:00:00Z"
    },
    {
      "id": 7,
      "title": "일곱 번째 게시글 제목",
      "content": "일곱 번째 게시글 내용입니다.",
      "author_id": 7,
      "date": "2025-03-12T11:30:00Z"
    },
    {
      "id": 8,
      "title": "여덟 번째 게시글 제목",
      "content": "여덟 번째 게시글 내용입니다.",
      "author_id": 8,
      "date": "2025-03-11T17:15:00Z"
    },
    {
      "id": 9,
      "title": "아홉 번째 게시글 제목",
      "content": "아홉 번째 게시글 내용입니다.",
      "author_id": 9,
      "date": "2025-03-10T08:40:00Z"
    },
    {
      "id": 10,
      "title": "열 번째 게시글 제목",
      "content": "열 번째 게시글 내용입니다.",
      "author_id": 10,
      "date": "2025-03-09T20:00:00Z"
    }
  ]

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

/*app.get('/ping', (req, res) => {
    res.send('pong');
  });
app.get('/asdf', (req, res) => {
  res.send('qwerty');
});
app.get('/abc', (req, res) => {
    res.send('가나디');
  });
app.get('/ggg', (req, res) => {
    res.send('제이에');
});

app.get('/users', (req, res) => {
    res.json(users);
}); 
app.get('/articles', (req, res) => {
    res.json(articles);
}); 

app.get('/test',(req,res)=>{
    console.log(req.query);
    console.log(req.query.id);
    res.send("ok")
});



app.get('/articles', (req, res)=>{
  res.send(req);

  console.log(articles)
}) */

  /*
app.get('/user/:id',(req,res)=>{

    console.log(req.params.id)
    let id = req.params.id;
    for(let user_len = users_len ; i++;){
        if(users[i].id == id){
            res.send(users)
        }
    }

    res.send('ok')
})
    */


// articles 에 있는 특정 id 를 가져오는 코드
app.get('/articles/:id',(req,res)=>{

  let article_id = req.params.id

  for(let i =0; i < articles.length ; i++){
    if(articles[i].id == article_id){
      return res.json(articles[i]);

    }
  }

  return res.json("없었습니다.")
})


// 게시물 가져오는 코드
app.get('/articles', (req,res)=>{
  return res.json(articles)
})


// 게시물 추가하는 코드
app.post('/articles', (req,res)=>{

  let data = req.body
  let lastid = articles[articles.length - 1].id
  data.id= lastid + 1

  const now = new Date().toUTCString().slice(0,19)+'Z';
  data.date = now;

  articles.push(data)
  return res.json("ok")
})

/*
// 연습했던 delet 사용법법
app.delete('/articles/:id', (req,res)=>{
  
  // :id 부분에 들어간 값(예: 3)을 req.params.id로 가져옵니다.
  const articleId = parseInt(req.params.id, 10);

  // 그 값을 사용해 articles 배열에서 해당 게시글을 찾아 삭제합니다.
  const index = articles.findIndex(article => article.id === articleId);

  if (index !== -1) {
    // 찾은 게시글을 삭제합니다.
    articles.splice(index, 1);
    return res.status(200).json({ message: '게시글이 삭제되었습니다.' });
  } else {
    // 해당 게시글을 못 찾으면 에러를 보냅니다.
    return res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다.' });
  }
})
  */

// 강사님이 알려준 delet 사용방법
app.delete('/articles/:id',(req,res)=>{
  let id = req.params.id

  console.log(id);
  
  articles.splice(id-1, 1);

  res.send("ok")

  
})
