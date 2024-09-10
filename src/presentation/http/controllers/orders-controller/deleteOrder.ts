import ordersService from '../../../../application/services';
import { Order } from '../../../../domain/entities';
import { IReturnValue } from '../../../../domain/valueObjects/returnValue';
import RequestObject from '../../../../utils/types/requestObject';
import IContoller from '../Icontroller';

export class DeleteOrderController
  implements IContoller<Promise<IReturnValue<Order | null>>>
{
  handle(request: RequestObject): Promise<IReturnValue<Order | null>> {
    return ordersService.deleteOrder(request.params.id);
  }
}

export default new DeleteOrderController();
