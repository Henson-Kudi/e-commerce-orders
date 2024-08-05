import { CreateOrderDTO, FindOrdersFilter, FindOrdersOptions, UpdateOrderDTO } from "../../domain/dtos";
import MessageBroker from "../../infrastructure/providers/messageBroker";
import OrdersRepository from "../../infrastructure/repositories";
import IMessageBroker from "../providers/messageBroker";
import CancelOrderUseCase from "../use-cases/cancelOrder";
import CreateOrderUseCase from "../use-cases/createOrder";
import DeleteOrderUseCase from "../use-cases/deleteOrder";
import DeleteOrdersUseCase from "../use-cases/deleteOrders";
import GetOrderUseCase from "../use-cases/getOrder";
import GetOrdersUseCase from "../use-cases/getOrders";
import UpdateOrderUseCase from "../use-cases/updateOrder";

// This file should bring your usecases together. eg: userService could be a combination of all user related use cases
export class OrdersService {
    private readonly ordersRepository: OrdersRepository = new OrdersRepository();
    private readonly messageBroker: IMessageBroker = new MessageBroker()

    createOrder(params: CreateOrderDTO) {
        return new CreateOrderUseCase(this.ordersRepository, this.messageBroker).execute(params)
    }

    updateOrder(params: { id: string, data: UpdateOrderDTO }) {
        return new UpdateOrderUseCase(this.ordersRepository, this.messageBroker).execute(params)
    }

    deleteOrder(id: string) {
        return new DeleteOrderUseCase(this.ordersRepository, this.messageBroker).execute(id)
    }

    deleteOrders(params: FindOrdersFilter) {
        return new DeleteOrdersUseCase(this.ordersRepository, this.messageBroker).execute(params)
    }

    cancelOrder(id: string) {
        return new CancelOrderUseCase(this.ordersRepository, this.messageBroker).execute(id)
    }

    getOrder(params: {
        id: string;
        options: FindOrdersOptions;
    }) {
        return new GetOrderUseCase(this.ordersRepository).execute(params)
    }

    getOrders(params: {
        filter: FindOrdersFilter;
        options: FindOrdersOptions;
    }) {
        return new GetOrdersUseCase(this.ordersRepository).execute(params)
    }
}

export default new OrdersService()