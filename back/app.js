const express = require('express');
const http = require('http');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models')
const cors = require('cors')
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const app = express()

dotenv.config();

db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공')
    })
    .catch(console.error)

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true //쿠키전달
}))

passportConfig();

app.use(morgan('dev'))
app.use('/',express.static(path.join(__dirname,'uploads')))
app.use(express.json()) //front에서 받은 json형식의 데이터를 req.body에 넣어줌
app.use(express.urlencoded({extended:true})) // form submit은 urlencoded로 데이터가 넘어옴
app.use(cookieParser('nodebirdsecret'))
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        secure:false
    }
}));
app.use(passport.initialize())
app.use(passport.session())


app.use('/post',postRouter);
app.use('/user',userRouter);
app.use('/posts',postsRouter);
app.use('/hashtag',hashtagRouter);


app.listen(3065,()=>{
    console.log('서버 실행 중')
});


