import { Router } from 'express';
import passport from 'passport';

import { validateBody } from '../../validation/validator';
import { getHelloWorld, postLogin } from './publicController';
import { postLoginSchema } from './publicSchema';

const router = Router({
  mergeParams: true,
});

router.get('/hello-world', getHelloWorld);

router.post(
  '/login',
  [
    validateBody(postLoginSchema),
    passport.authenticate('local', {
      session: false,
    }),
  ],
  postLogin,
);

export default router;
