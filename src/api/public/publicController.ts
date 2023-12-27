import { Request, Response } from 'express';

import { createHelloWorldResponse } from './publicService';

export function getHelloWorld(req: Request, res: Response) {
  const message = createHelloWorldResponse();
  res.send({message});
};