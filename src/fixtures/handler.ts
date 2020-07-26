import { Request, Response } from 'express';
import { NextApiRequest, NextApiResponse } from 'next';
import nodeMocks from 'node-mocks-http';

export const createMocks = () => {
  const req = nodeMocks.createRequest<NextApiRequest & Request>();
  const res = nodeMocks.createResponse<NextApiResponse & Response>();

  res.status = jest.fn(function () {
    return this as typeof res;
  });
  res.json = jest.fn(data => data);
  res.end = jest.fn(chunk => chunk);

  return { req, res };
};
