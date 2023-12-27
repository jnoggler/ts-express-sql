import { Router } from 'express';

import { getHelloWorld } from './publicController';

const router = Router({
    mergeParams: true,
});

router.get('/hello-world', getHelloWorld);

export default router;