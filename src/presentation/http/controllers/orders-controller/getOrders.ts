import ordersService from "../../../../application/services";
import { Order } from "../../../../domain/entities";
import { IReturnValueWithPagination } from "../../../../domain/valueObjects/returnValue";
import RequestObject from "../../../../utils/types/requestObject";
import IContoller from "../Icontroller";

export class GetOrdersController implements IContoller<Promise<IReturnValueWithPagination<Order[]>>> {
    handle(request: RequestObject): Promise<IReturnValueWithPagination<Order[]>> {
        return ordersService.getOrders(request.query ?? {})
    }
}

export default new GetOrdersController()