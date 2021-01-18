const http = require('http');
const postRouter = require('./routes/post');
const app = express()

app.get('/api',(req,res)=>{
    res.send('hello express');
})

app.use('/post',postRouter)

app.listen(3065,()=>{
    console.log('서버 실행 중')
});


