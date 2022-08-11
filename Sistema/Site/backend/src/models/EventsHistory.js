const { Model, DataTypes } = require('sequelize')

class tbl_HardHistories extends Model{
	static init(sequelize){
		super.init({
			UserId: DataTypes.INTEGER,
			OshiStatus: DataTypes.STRING,
			GPUStatus: DataTypes.STRING,
			CpuStatus: DataTypes.STRING,
		}, {
			sequelize
		})
	}
	static associate(models){
		this.belongsTo(models.tbl_Users, { foreignKey: 'UserId', as: 'Users'})
	}
}

module.exports = tbl_HardHistories;