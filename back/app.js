const express = require('express');
const http = require('http');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models')
const cors = require('cors')
const passportConfig = require('./passport')

const app = express()

db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공')
    })
    .catch(console.error)

app.use(cors({
    origin:'*',
    credentials:false
}))

passportConfig();

app.use(express.json()) //front에서 받은 json형식의 데이터를 req.body에 넣어줌
app.use(express.urlencoded({extended:true})) // form submit은 urlencoded로 데이터가 넘어옴

app.use('/post',postRouter);
app.use('/user',userRouter);

app.listen(3065,()=>{
    console.log('서버 실행 중')
});


