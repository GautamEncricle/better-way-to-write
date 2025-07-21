import express from 'express';

import userRoutes from './user.routes.js';

const routes = express.Router();

routes.get('/', (req, res) => res.send('Hello World!'));
routes.use('/users', userRoutes);

export default routes;
