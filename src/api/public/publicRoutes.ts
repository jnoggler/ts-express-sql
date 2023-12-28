import { Router } from 'express';

import {validate} from '../../validation/validator';
import { getHelloWorld, postLogin } from './publicController';
import { postLoginSchema } from './publicSchema';

const router = Router({
    mergeParams: true,
});

router.get('/hello-world', getHelloWorld);

router.post('/login', validate(postLoginSchema), postLogin);

export default router;