import { Router } from 'express';

import { getHelloWorld, postLogin } from './publicController';

const router = Router({
    mergeParams: true,
});

router.get('/hello-world', getHelloWorld);

router.post('/login', postLogin);

export default router;