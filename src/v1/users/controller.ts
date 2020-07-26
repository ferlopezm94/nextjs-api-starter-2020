import { NextApiRequest, NextApiResponse } from 'next';

import { UserModel } from './model';

export const create = async (req: NextApiRequest, res: NextApiResponse) => {
  req.logger.info({ status: 'create start', args: req.body });

  try {
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    req.logger.error({ status: 'create error', error: error.message });
    return res.status(400).json({ error: error.message });
  }
};

export const getMany = async (req: NextApiRequest, res: NextApiResponse) => {
  req.logger.info({ status: 'getMany start' });

  try {
    const users = await UserModel.find({});
    return res.status(200).json(users);
  } catch (error) {
    req.logger.error({ status: 'getMany error', error: error.message });
    return res.status(500).json({ error: error.message });
  }
};
