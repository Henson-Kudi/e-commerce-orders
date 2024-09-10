import { NextFunction, Request, Response } from 'express';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';
import createOrderController from '../../../http/controllers/orders-controller/createOrder';

export default async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await expressAdapter(req, createOrderController);

    if (!result.success) {
      throw result.error;
    }

    return res.status(ResponseCodes.Success).json(result);
  } catch (err) {
    next(err);
  }
}
