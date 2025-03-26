


function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).send('인증 헤더 없음');
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send('토큰 검증 실패');
      }
  
      // 인증 성공 시 decoded 안에 있는 사용자 정보 req에 저장
      req.user = decoded;
      next(); // 다음 미들웨어 or 라우터로
    });
  }
  
  
  
  