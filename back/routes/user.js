const express = require('express');
const router = express.Router();
const {User, Post} = require('../models');
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

        const followers = me.getFollowers();

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

        const followings = me.getFollowings();

        res.status(200).json({followings})
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;