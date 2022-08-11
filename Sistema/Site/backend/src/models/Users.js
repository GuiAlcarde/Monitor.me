const {
	Model,
	DataTypes
} = require('sequelize')
const bcrypt = require("bcryptjs");

class tbl_Users extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			cellphone: DataTypes.STRING,
			password: DataTypes.STRING,
			idTelegram: DataTypes.STRING
		},{
			hooks: {
				beforeCreate: async users => {
					const hashedPassword = await bcrypt.hash(users.password, 10);
					users.password = hashedPassword;
				}
			}
			,sequelize: sequelize
		})
	}
	static associate(models) {
		this.hasMany(models.tbl_HardHistories, {foreignKey: 'UserId', as: 'histories'})
	}
}

module.exports = tbl_Users;