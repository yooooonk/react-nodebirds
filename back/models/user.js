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

    User.associate = (db)=>{
        
        db.User.hasMany(db.Post)
        db.User.hasMany(db.Comment),
        db.User.belongsToMany(db.Post,{through:'Like',as:'Likers'});
        db.User.belongsToMany(db.User,{through:'Follow', as :'Followers',foreignKey:'followingId'});
        db.User.belongsToMany(db.User,{through:'Follow', as :'Followings',foreignKey:'followerId'});
        
    };

    return User;
}