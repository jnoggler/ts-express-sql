import { Request, Response } from 'express';

import { createPrivateContent } from './protectedService';

export function getPrivateContent(req: Request, res: Response) {
  const message = createPrivateContent();
  res.send({ message });
}
