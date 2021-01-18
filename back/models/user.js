const { DataTypes } = require("sequelize/types");
const sequelize  = require('sequelize');

module.exports = (sequelize,DataTypes) =>{    

    const User = sequelize.define('User', {
        email:{
            type:DataTypes.STRING(50),
            allowNull:false,
            unique:true
        },
        nickname:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false
        }
    },{
        chardset:'utf8',
        collate:'utf8_general_ci'
    });

    User.associtate = (db)=>{
        db.User.hasMay(db.Post)
        db.User.hasMay(db.Comment),
        db.User.belongsToMany(db.Post,{through:'Like',as:'Liked'});
        db.User.belongsToMany(db.User,{through:'Follow', as :'Followers',foreignKey:'followingId'});
        db.User.belongsToMany(db.User,{through:'Follow', as :'Followings',foreignKey:'followerId'});
        
    };

    return User;
}