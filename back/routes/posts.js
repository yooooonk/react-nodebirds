const express = require('express')
const router = express.Router();
const {Post, User, Comment, Image} = require('../models')

router.get('/',async(req,res,next)=>{
    
    try {
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
            }]

            
        })

        res.status(200).json(posts)    
    } catch (error) {
        console.error(error);
        next(error)
    }
    
})

module.exports = router;