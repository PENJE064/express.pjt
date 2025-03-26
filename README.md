# Express Project


# 중요
- 깃 파일 꼬이게 하면 안됌

# 깃 컴잇 방법
- git add .
- git commit -m "파일이름"
- git push origin main

# 깃 사용 방법 1
- git clone 은 처음 딱 한번만
- git 파일을 가져올때 pull만 사용해라


## Articles Create
- Post를 써서 만들고
- Get을 써서 불러온다는 것을 배웠다
- Delet를 사용해서 써있는 것을 지웠다.

## URL 설계 방법
- url로는 리소ㅓ스(특징 페이지, 혹은 정보)를 표현하고 
- http 메소드를 이 리소스에 어떤 행위를 할지 한다고 한다


##  authMiddleware 코드
- auth 미들웨어 라는 걸 이용해서 로그인 token 이 없는 사용자가 수정, 작성, 삭제를 못하겟금 해준다
- jwt.verify 를 공통 처리함
- app.post('/users',authMiddleware (req, res) => {}) 이런 식으로 적용함

