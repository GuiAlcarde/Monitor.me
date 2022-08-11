const express = require('express');
const CadastrarController = require('./controllers/CadastrarController')
// const ProfileController = require('./controllers/ProfileController')
const EventController = require('./controllers/EventController');
const SessionController = require('./controllers/SessionController');
const authMiddleware = require('./middlewares/auth');

//Gerencia Rotas
const routes = express.Router();

// routes.get('/profile', ProfileController.ListProfile)// Executa Perfil do usuário

//Rotas Públicas
routes.post('/cadastrar', CadastrarController.cadastrar);//Cadastra Novo usuario
routes.post('/sessions', SessionController.createLogin);

//Rotas Internas
routes.get('/sistema/:UserId/events', EventController.getEvents)
routes.post('/sistema/events', EventController.cadastrarEvento)

routes.get('/all', EventController.getAllUser);

module.exports = routes;