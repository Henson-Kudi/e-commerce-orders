import { NextFunction, Request, Response } from 'express';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';
import deleteOrderController from '../../../http/controllers/orders-controller/deleteOrder';

export default async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await expressAdapter(req, deleteOrderController);

    if (!result.success) {
      throw result.error;
    }

    return res.status(ResponseCodes.Success).json(result);
  } catch (err) {
    next(err);
  }
}
