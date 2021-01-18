const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) =>{
    

    const Image = sequelize.define('User', {
        src:{
            type:DataTypes.STRING(200),
            allowNull:false,
        }
    },{
        chardset:'utf8',
        collate:'utf8_general_ci'
    });

    Image.associtate = (db)=>{
        db.Image.belongsTo(db.Post)
    };

    return Image;
}