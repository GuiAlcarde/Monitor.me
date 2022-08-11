require('./database')
const express = require('express'); 
const app = express(); //recebe modulo Express
const cors = require('cors');
const routes = require('./routes'); // recebe arquivo de rota
<<<<<<< HEAD:Sistema/Site/backend/src/index.js
const reqLog = require('./middlewares/logger')
const dotenv = require('dotenv');

=======
const systemRoutes = require('./controllers/SistemaRoutes'); // recebe arquivo de rota
const reqLog = require('./middlewares/logger')
const dotenv = require('dotenv');

console.log(process.env.USER)
>>>>>>> f65939ba51d871dbbe604815d0bf143319b32f67:Sistema/Site/Amb.Dev/backend/src/index.js

dotenv.config()
app.use(reqLog)
app.use(cors());
app.use(express.json());
app.use(routes);
<<<<<<< HEAD:Sistema/Site/backend/src/index.js

const PORT = process.env.PORT || 3333;
=======
app.use(systemRoutes);

const PORT = process.env.PORT;
>>>>>>> f65939ba51d871dbbe604815d0bf143319b32f67:Sistema/Site/Amb.Dev/backend/src/index.js
app.listen(PORT, () => {`Listening at Port ${PORT}`});