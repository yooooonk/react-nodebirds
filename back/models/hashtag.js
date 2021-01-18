const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) =>{   

    const Hashtag = sequelize.define('User', {
        name:{
            type:DataTypes.STRING(20),
            allowNull:false,
        }
    },{
        chardset:'utf8mb4',
        collate:'utf8mb4_general_ci'
    });

    Hashtag.associtate = (db)=>{
        db.HashTag.belongsToMany(db.Post)
    };

    return Hashtag;
}