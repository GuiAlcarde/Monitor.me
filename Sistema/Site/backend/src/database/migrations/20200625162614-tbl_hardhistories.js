'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_HardHistories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbl_Users',
          key: 'id'
        } ,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false,
      },
      OshiStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      GPUStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE, 
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('tbl_Users');
    }
  };
