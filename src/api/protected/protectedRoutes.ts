import { Router } from 'express';
import passport from 'passport';

import { getPrivateContent } from './protectedController';

const router = Router({
    mergeParams: true,
});

router.use(passport.authenticate('jwt', { session: false }));

router.get('/private-content', getPrivateContent);

export default router;