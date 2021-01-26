const express = require('express');
const router = express.Router();
const {Op} = require('sequelize')
const {Post, User, Comment, Image} = require('../models')

router.get('/',async(req,res,next)=>{
    
    try {
        console.log('header',req.headers)
        const where = {};
        
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      
    }

        const posts = await Post.findAll({            
            limit:10,
            order:[
                ['createdAt','DESC'],
                [Comment,'createdAt','DESC'],
            ],
            include:[{
                model:User,
                attributes:['id','nickname']
            },{
                model: Comment,
                include:[{
                    model:User,
                    attributes:['id','nickname']
                }]
            },{
                model:Image
            },{
                model:User, // 좋아요한사람
                as:'Likers',
                attributes:['id']
            }]

            
        })

        res.status(200).json(posts)    
    } catch (error) {
        console.error(error);
        next(error)
    }
    
})

module.exports = router;