const express = require('express');
const router = express.Router();
const {Post, Image, User, Comment, } = require('../models')
const {isLoggedIn} = require('./middleware')


router.post('/',async (req,res)=>{
    
    try {
        const post = await Post.create({
            content:req.body.content,
            UserId:req.user.id         
        })
        
        const fullPost = await Post.findOne({
            where:{id:post.id},
            include:[{
                model:Image
            },{
                model:Comment,
                include:[{
                    model:User,
                    attributes:['id','nickname']
                }]                
            },{
                model:User,
                attributes:['id','nickname']
            },{
                model:User, // 좋아요한사람
                as:'Likers',
                attributes:['id']
            }]
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
            where:{id:req.params.postId}
        })

        console.log(post)
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다')
        }
        
        const newComment = await Comment.create({
            content:req.body.content,
            PostId:parseInt(req.params.postId),
            UserId:req.user.id
        })
        
        const fullComment = await Comment.findOne({
            where:{id:newComment.id},
            include:[
                {
                    model:User,
                    attributes:['id','nickname']
                }
            ]
        })

        res.status(200).json(fullComment)
    } catch (error) {
        console.error(error);
        next(error)
    }    
})

router.patch('/:postId/like',isLoggedIn, async(req,res,next)=>{
    
    try {
        const post = await Post.findOne({
            where : parseInt(req.params.postId)
        })
    
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다')
        }

        await post.addLikers(req.user.id)
        res.status(200).json({PostId:post.id, UserId:req.user.id})

    } catch (error) {
        console.error(error);
        next(error)
    }    
})


router.delete('/:postId/like',isLoggedIn, async (req,res,next)=>{
    try {
        const post = await Post.findOne({
            where : parseInt(req.params.postId)
        })
    
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다')
        }

        await post.removeLikers(req.user.id)
        res.status(200).json({PostId:post.id, UserId:req.user.id})

    } catch (error) {
        console.error(error);
        next(error)
    }
})

router.delete('/:postId/delete',async(req,res,next)=>{
    try {
        const postId = parseInt(req.params.postId)
        await Post.destroy({
            where:{
                id : postId,
                UserId:req.user.id
            }
        });

        res.status(200).json({PostId:postId})

    } catch (error) {
        console.error(error);
        next(error)        
    }
});



module.exports = router;