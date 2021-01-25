const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const {Post, Image, User, Comment, Hashtag} = require('../models')
const {isLoggedIn} = require('./middleware');

try{
    fs.accessSync('uploads');
}catch(error){
    console.log('uploads 폴더가 없으므로 생성합니다')
    fs.mkdirSync('uploads');
}


const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null, 'uploads'); // uploads라는 폴더에 저장
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname); //확장자 추출  .png
            const basename = path.basename(file.originalname,ext); //제로초
            
            done(null, basename+new Date().getTime()+ext);
        }
    }),
    limits:{ fileSize:20*1024*1024}
})

router.post('/images',isLoggedIn, upload.array('image'),async(req,res,next)=>{
    console.log(req.files);
    res.status(200).json(req.files.map((v)=>v.filename));
})

router.post('/',isLoggedIn, upload.none(), async (req,res,next)=>{
    
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id         
        })
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
              where: { name: tag.slice(1).toLowerCase() },
            }))); // [[노드, true], [리액트, true]]
            await post.addHashtags(result.map((v) => v[0]));
          }

        if(req.body.image){
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((image)=>Image.create({src:image})));
                await post.addImages(images)
            }else{
                const image = await Image.create({src:req.body.image})
                await post.addImages(image)
            }
        }
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

router.post('/:postId/retweet',isLoggedIn,async (req,res)=>{ // POST /post/1/comment
    try {
        const post = await Post.findOne({
            where:{id:req.params.postId},
            include:[{
                model:Post,
                as:'Retweet'
            }]
        })        
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다')
        }
        
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        
        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
            return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
        }

        const retweetTargetId = post.RetweetId || post.id;

        const exPost = await Post.findOne({
            where: {
              UserId: req.user.id,
              RetweetId: retweetTargetId,
            },
        });

        if (exPost) {
            return res.status(403).send('이미 리트윗했습니다.');
        }

        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',
        });

        const retweetWithPrevPost = await Post.findOne({
            where: { id: retweet.id },
            include: [{
              model: Post,
              as: 'Retweet',
              include: [{
                model: User,
                attributes: ['id', 'nickname'],
              }, {
                model: Image,
              }]
            }, {
              model: User,
              attributes: ['id', 'nickname'],
            }, {
              model: Image,
            }, {
              model: Comment,
              include: [{
                model: User,
                attributes: ['id', 'nickname'],
              }],
            },{
                model:User, // 좋아요한사람
                as:'Likers',
                attributes:['id']
            }],
        })

        res.status(200).json(retweetWithPrevPost)
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