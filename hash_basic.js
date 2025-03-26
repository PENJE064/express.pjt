let password = 12345678

console.log("사용자가 입력한 비밀번호",  password)

let dbPassword = password * 7 -100
console.log("우리가 dv에 저장한 비밀번호", dbPassword)

let loginPassword = 12345678
console.log("사용자가 로그인시 입력한 비번", loginPassword)

if(loginPassword == dbPassword){
    console.log("패스워드 같음")
}else{
    console.log("패스워드 다름 ")
}