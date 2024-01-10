import { Router } from 'express';
import passport from 'passport';

import { protectedController } from './protectedController';
import { validateBody } from '../../validation/validator';
import { postCreateUserSchema } from './protectedSchema';

const router = Router({
  mergeParams: true,
});

router.use(
  passport.authenticate(['jwtHeader', 'jwtCookie'], { session: false }),
);

router.get('/private-content', protectedController.getPrivateContent);

router.get('/users', protectedController.getUsers);

router.post(
  '/users',
  validateBody(postCreateUserSchema),
  protectedController.createUser,
);

export default router;
