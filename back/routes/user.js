const express = require('express');
const router = express.Router();
const {User, Post, Image, Comment, Hashtag} = require('../models');
const bcrypt = require('bcrypt')
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middleware')

router.get('/',async(req,res,next)=>{

    try {
        if(req.user){
            
            const fullUserWithoutPassword = await User.findOne({
                where:{id:req.user.id},
                attributes:{
                    exclude:['password']
                },
                include:[{
                    model:Post,
                    attributes:['id']
                },{
                    model:User,
                    as:'Followers',
                    attributes:['id']
                },{
                    model:User,
                    as:'Followings',
                    attributes:['id']
                }]
            })

            res.status(200).json(fullUserWithoutPassword)
        }else{
            res.status(200).json(null)
        }
        
    } catch (error) {
        console.error(error)
        next(error)
    }

    
})

router.get('/:id/posts', async (req, res, next) => { // GET /user/1/posts
    try {
      const user = await User.findOne({ where: { id: req.params.id }});
      if (user) {
        const where = {};
        if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
          where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
        const posts = await user.getPosts({
          where,
          limit: 10,
          include: [{
            model: Image,
          }, {
            model: Comment,
            include: [{
              model: User,
              attributes: ['id', 'nickname'],
            }]
          }, {
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: User,
            through: 'Like',
            as: 'Likers',
            attributes: ['id'],
          }, {
            model: Post,
            as: 'Retweet',
            include: [{
              model: User,
              attributes: ['id', 'nickname'],
            }, {
              model: Image,
            }]
          }],
        });
        console.log(posts);
        res.status(200).json(posts);
      } else {
        res.status(404).send('존재하지 않는 사용자입니다.');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  

router.post('/signup', isNotLoggedIn, async(req,res,next)=>{
    try{
        const exUser = await User.findOne({
            where:{
                email:req.body.email
            }
        });

        if(exUser){
            return res.status(403).send('이미 사용중인 이메일입니다')
        }

        const hashedPassword = await bcrypt.hash(req.body.password,13);
        await User.create({
        email:req.body.email,
        nickname:req.body.nickname,
        password:hashedPassword,
        });
        
        res.status(200).send('ok')
    
    }catch(error){
        console.error(error)
        next(error)
    }

})

router.post('/login',isNotLoggedIn, (req,res,next)=>{
    passport.authenticate('local',(serverError,user,clientError)=>{
        if(serverError){
            console.error(serverError);
            return next(serverError)
        }        
        
        if(clientError){            
            return res.status(401).send(clientError.reason)
        }

        return req.login(user,async (loginErr)=>{ // passport login - passport/index.js
            if(loginErr){                
                return next(loginErr)
            }
            const fullUserWithoutPassword = await User.findOne({
                where:{id:user.id},
                attributes:{
                    exclude:['password']
                },
                include:[{
                    model:Post
                },{
                    model:User,
                    as:'Followers'
                },{
                    model:User,
                    as:'Followings'
                }]
            })
            
            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req,res,next);
})

router.post('/logout',isLoggedIn,(req,res,next)=>{
    console.log(req)
    req.logout();
    req.session.destroy();
    res.status(200).send('ok')
})

router.patch('/nickname',isLoggedIn, async(req,res,next)=>{
    try {
        
        await User.update({
            nickname:req.body.nickname
        },{
            where:{id:req.user.id}
        })
        res.status(200).json({nickname:req.body.nickname})
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.patch('/:userId/follow',isLoggedIn, async(req,res,next)=>{
    try {
        
        const followingId= parseInt(req.params.userId);

        const followingUser = await User.findOne({
            where:{
                id:followingId
            }
        });

        if(!followingUser){
            res.status(403).send('없는 계정은 팔로우할 수 없습니다')
        }
        
        await followingUser.addFollowers(req.user.id);
        
        res.status(200).json({followingId})
       
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.delete('/:userId/follow',isLoggedIn, async(req,res,next)=>{
    try {

        const followingId= parseInt(req.params.userId);
        
        const followingUser = await User.findOne({
            where:{
                id:followingId
            }
        });

        if(!followingUser){
            res.status(403).send('없는 계정은 팔로우할 수 없습니다')
        }

        await followingUser.removeFollowers(req.user.id)
        res.status(200).json({followingId})
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/followers',isLoggedIn, async(req,res,next)=>{
    try {
        const me = await User.findOne({where:{id:req.user.id}});

        if(!me){
            res.status(403).send('팔로워 목록을 가져올 수 없습니다')
        }

        const followers = await me.getFollowers({limit:parseInt(req.query.limit,10)});

        res.status(200).json({followers})
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/followings',isLoggedIn, async(req,res,next)=>{
    try {
        const me = await User.findOne({where:{id:req.user.id}});

        if(!me){
            res.status(403).send('팔로워 목록을 가져올 수 없습니다')
        }

        const followings = await me.getFollowings({limit:parseInt(req.query.limit,10)});

        res.status(200).json({followings})
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.delete('/follower/:userId',isLoggedIn, async(req,res,next)=>{
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if (!user) {
          res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
      } catch (error) {
        console.error(error);
        next(error);
      }
})

module.exports = router;