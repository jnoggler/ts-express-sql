import { Router } from 'express';
import passport from 'passport';

import { validateBody } from '../../validation/validator';
import { publicController } from './publicController';
import { postLoginSchema } from './publicSchema';

const router = Router({
  mergeParams: true,
});

router.get('/hello-world', publicController.getHelloWorld);

router.post(
  '/login',
  [
    validateBody(postLoginSchema),
    passport.authenticate('local', {
      session: false,
    }),
  ],
  publicController.login,
);

export default router;
