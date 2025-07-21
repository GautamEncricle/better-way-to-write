import express from 'express';
const routes = express.Router();
import { signupUser, loginUser, deleteUser, logoutUser } from '../controllers/user.controller.js';

routes.get('/', (req, res) => res.send('user routes working...'));


routes.get('/test', (req, res) => {
    res.send('test');
})
routes.post('/signup', signupUser);
routes.post('/login', loginUser);
routes.post('/id', deleteUser);
routes.post('/logout', logoutUser);

export default routes;