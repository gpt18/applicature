import express from 'express';

const UserRoutes = (router: express.Router): void => {
  router.get('/user', (req, res) => {
    res.status(200).json({message: "User route"});
  });

};

export default UserRoutes;