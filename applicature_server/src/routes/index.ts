import { Router } from 'express';
import UserRoutes from './v1/user.route';
import AuthRoutes from './v1/auth.route';

const router = Router();

export const routerv1 = () => {

    UserRoutes(router);
    AuthRoutes(router);

    return router;
}

