import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from './../../../../utils';
import { create, getMany } from './../../../../v1/users/controller';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info({ status: 'handler start' });

  await connectToDatabase();

  switch (req.method) {
    case 'POST':
      return create(req, res);
    case 'GET':
      return getMany(req, res);
    default:
      console.warn({ status: `Method ${req.method} Not Allowed` });
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
