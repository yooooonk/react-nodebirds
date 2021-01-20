const passport = require('passport');
const local = require('./local')
const { User } = require('../models');


local()

module.exports = () =>{
    passport.serializeUser((user,done)=>{ // 처음로그인할 때
        done(null,user.id);
    });

    passport.deserializeUser(async(id, done)=>{ 
        console.log('deserializeUser실행')
        // 로그인 다음 요청부터
        // id로 db에서 검색해서
        // req.user에 넣어줌
        try {
            const user = await User.findOne({where:{id}})
        
            done(null, user); 
        } catch (error) {
            console.error(error);
            done(error)
        }
    });

    
}