import { NextApiRequest, NextApiResponse } from 'next';

import { withLogger } from './../../../../middlewares';
import { connectToDatabase } from './../../../../utils';
import { create, getMany } from './../../../../v1/users/controller';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.logger = req.logger.child({ version: '1', module: 'users' });
  req.logger.info({ status: 'handler start' });

  await connectToDatabase();

  switch (req.method) {
    case 'POST':
      return create(req, res);
    case 'GET':
      return getMany(req, res);
    default:
      req.logger.warn({ status: `Method ${req.method} Not Allowed` });
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withLogger(handler);
