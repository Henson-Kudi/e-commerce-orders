import { NextFunction, Request, Response } from "express";
import expressAdapter from "../../../adapters/expressAdapter";
import { ResponseCodes } from "../../../../domain/enums/responseCode";
import getOrderController from "../../../http/controllers/orders-controller/getOrder";

export default async function getOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await expressAdapter(req, getOrderController);

        if (!result.success) {
            throw result.error;
        }

        return res.status(ResponseCodes.Success).json(result);
    } catch (err) {
        next(err);
    }
}