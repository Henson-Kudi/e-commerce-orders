import ordersService from '../../../../application/services';
import { IReturnValue } from '../../../../domain/valueObjects/returnValue';
import RequestObject from '../../../../utils/types/requestObject';
import IContoller from '../Icontroller';

export class DeleteOrdersController
  implements IContoller<Promise<IReturnValue<{ count: number }>>>
{
  handle(request: RequestObject): Promise<IReturnValue<{ count: number }>> {
    return ordersService.deleteOrders(request.query ?? {});
  }
}

export default new DeleteOrdersController();
