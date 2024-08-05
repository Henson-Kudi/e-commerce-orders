import { NextFunction, Request, Response } from "express";
import expressAdapter from "../../../adapters/expressAdapter";
import { ResponseCodes } from "../../../../domain/enums/responseCode";
import updateOrderController from "../../../http/controllers/orders-controller/updateOrder";

export default async function updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await expressAdapter(req, updateOrderController);

        if (!result.success) {
            throw result.error;
        }

        return res.status(ResponseCodes.Success).json(result);
    } catch (err) {
        next(err);
    }
}