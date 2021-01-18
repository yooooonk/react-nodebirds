const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) =>{
    
    const Post = sequelize.define('User', {
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        }        
        
    },{
        chardset:'utf8mb4',
        collate:'utf8mb4_general_ci'
    });

    Post.associtate = (db)=>{
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.HashTag);
        db.Post.belongsToMany(db.User,{through:'Like', as:'Liked'});
        db.Post.belongsTo(db.Post,{ as:'Retweet'});
        
    };

    return Post;
}