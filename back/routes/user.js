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



module.exports = router;