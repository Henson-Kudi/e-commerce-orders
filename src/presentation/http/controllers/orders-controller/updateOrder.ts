import ordersService from "../../../../application/services";
import { Order } from "../../../../domain/entities";
import { IReturnValue } from "../../../../domain/valueObjects/returnValue";
import RequestObject from "../../../../utils/types/requestObject";
import IContoller from "../Icontroller";

export class UpdateOrderController implements IContoller<Promise<IReturnValue<Order | null>>> {
    handle(request: RequestObject): Promise<IReturnValue<Order | null>> {
        return ordersService.updateOrder({
            data: request.body,
            id: request.params.id
        })
    }
}

export default new UpdateOrderController()