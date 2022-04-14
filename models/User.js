const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model { 
    //function to verify password
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    };
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2],
            }
        }
    },
    {
        hooks: {
            //async method to hash password for a new user
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //async method to hash updated password
            async beforeUpdate(updateUserData) {
                updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
                return updateUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;