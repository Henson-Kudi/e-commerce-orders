import { NextFunction, Request, Response } from 'express';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';
import deleteOrdersController from '../../../http/controllers/orders-controller/deleteOrders';

export default async function deleteOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await expressAdapter(req, deleteOrdersController);

    if (!result.success) {
      throw result.error;
    }

    return res.status(ResponseCodes.Success).json(result);
  } catch (err) {
    next(err);
  }
}
