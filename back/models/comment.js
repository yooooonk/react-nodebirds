
module.exports = (sequelize,DataTypes) =>{
    

    const Comment = sequelize.define('Comment', {
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        }
    },{
        chardset:'utf8mb4',
        collate:'utf8mb4_general_ci'
    });

    Comment.associate = (db)=>{
        db.Comment.belongsTo(db.User)
        db.Post.belongsTo(db.Post)
    };

    return Comment;
}