const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) =>{
    

    const Comment = sequelize.define('User', {
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        }
    },{
        chardset:'utf8mb4',
        collate:'utf8mb4_general_ci'
    });

    Comment.associtate = (db)=>{
        db.Comment.belongsTo(db.User)
        db.Post.belongsTo(db.Post)
    };

    return Comment;
}