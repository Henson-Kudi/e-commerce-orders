import { NextFunction, Request, Response } from "express";
import expressAdapter from "../../../adapters/expressAdapter";
import { ResponseCodes } from "../../../../domain/enums/responseCode";
import cancelOrderController from "../../../http/controllers/orders-controller/cancelOrder";

export default async function cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await expressAdapter(req, cancelOrderController);

        if (!result.success) {
            throw result.error;
        }

        return res.status(ResponseCodes.Success).json(result);
    } catch (err) {
        next(err);
    }
}