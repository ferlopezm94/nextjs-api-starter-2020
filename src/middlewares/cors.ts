import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { Handler } from './types';

function initCors() {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line
      // @ts-ignore
      Cors()(req, res, result => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const withCors = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
  await initCors()(req, res);
  return handler(req, res);
};
