const express = require('express');
const router = express.Router();
const {Post, Image, User, Comment} = require('../models')
const {isLoggedIn} = require('./middleware')


router.post('/',async (req,res)=>{
    
    try {
        const post = await Post.create({
            content:req.body.content,
            UserId:req.user.id         
        })
        
        const fullPost = await Post.findOne({
            where:{id:post.id},
            include:[
                {model:Image},
                {model:Comment},
                {model:User}
            ]
        })
        
        res.status(200).json(fullPost) 
    } catch (error) { 
        console.error('에러났음',error); 
        next(error)
    }    
})

router.post('/:postId/comment',isLoggedIn,async (req,res)=>{ // POST /post/1/comment
    try {
        const post = await Post.findOne({
            where:{id:req.params.id}
        })

        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다')
        }
        const newComment = await Post.create({
            content:req.body.content,
            PostId:req.params.postId
        })

        res.status(200).json(newComment)
    } catch (error) {
        console.error(error);
        next(error)
    }    
})

router.get('/',(req,res)=>{
    res.json([
        {id:1,content:'hello'},
        {id:2,content:'hello2'},
        {id:3,content:'hello3'},
    ])
})



router.delete('/api/post',(req,res)=>{

})


module.exports = router;