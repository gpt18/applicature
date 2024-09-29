import express from 'express';
import UserModel, { getRegisteredUser } from '../../models/user.model';
import { generateCode, hashString, isValidEmail, verifyHash } from '../../config/auth';
import { checkUserRegistration, registerNewUser } from '../../controllers/auth.controller';

const AuthRoutes = (router: express.Router): void => {

  router.get('/auth', checkUserRegistration);
  router.post('/auth/register', registerNewUser);
  router.get('/auth/searchUsername', (req, res) => {
    res.send('Search Username');
  })

  router.post('/auth/login', (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    res.status(200).json({ message: "Auth route" });
  });


};

export default AuthRoutes;