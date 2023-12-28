import {Router} from 'express';

import publicRoutes from './public/publicRoutes';
import protectedRoutes from './protected/protectedRoutes';

const router = Router();

router.use('/public', publicRoutes);

router.use('/protected', protectedRoutes);

export default router;