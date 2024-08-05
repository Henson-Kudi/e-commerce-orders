import ordersService from "../../../../application/services";
import { Order } from "../../../../domain/entities";
import { IReturnValue } from "../../../../domain/valueObjects/returnValue";
import RequestObject from "../../../../utils/types/requestObject";
import IContoller from "../Icontroller";

export class CreateOrderController implements IContoller<Promise<IReturnValue<Order>>> {
    handle(request: RequestObject): Promise<IReturnValue<Order>> {
        return ordersService.createOrder(request.body)
    }
}

export default new CreateOrderController()