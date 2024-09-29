import express from 'express';

const AuthRoutes = (router: express.Router): void => {
  router.get('/auth', (req, res) => {
    res.status(200).json({message: "Auth route"});
  });

};

export default AuthRoutes;