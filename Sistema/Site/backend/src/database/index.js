const Sequelize = require('sequelize');
const dbconfig = require('../config/database')
const Users = require('../models/Users');
const EventsHistory = require('../models/EventsHistory')

const connection = new Sequelize(dbconfig)

Users.init(connection)
EventsHistory.init(connection)

Users.associate(connection.models)
EventsHistory.associate(connection.models)


module.exports = connection;