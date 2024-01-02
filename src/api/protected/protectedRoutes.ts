import { Router } from 'express';
import passport from 'passport';

import {
  getPrivateContent,
  getUsers,
  postCreateUser,
} from './protectedController';
import { validateBody } from '../../validation/validator';
import { postCreateUserSchema } from './protectedSchema';

const router = Router({
  mergeParams: true,
});

router.use(
  passport.authenticate(['jwtHeader', 'jwtCookie'], { session: false }),
);

router.get('/private-content', getPrivateContent);

router.get('/users', getUsers);

router.post('/users', validateBody(postCreateUserSchema), postCreateUser);

export default router;
