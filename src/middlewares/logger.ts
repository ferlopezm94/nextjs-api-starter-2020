import { NextApiRequest, NextApiResponse } from 'next';
import pino from 'pino';

declare module 'next' {
  interface NextApiRequest {
    logger: pino.Logger;
  }
}

let cachedLogger: pino.Logger | null = null;

function getLogger() {
  if (cachedLogger) {
    // console.log('cached logger retrieved');
    return cachedLogger;
  }

  const logger = pino().child({ env: process.env.ENV });
  cachedLogger = logger;
  // console.log('new logger created');
  return logger;
}

type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

export const withLogger = (handler: Handler) => (req: NextApiRequest, res: NextApiResponse) => {
  const logger = getLogger();
  req.logger = logger;
  return handler(req, res);
};
