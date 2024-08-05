import { Order } from "../../domain/entities";
import { ResponseCodes } from "../../domain/enums/responseCode";
import ErrorClass from "../../domain/valueObjects/error";
import { IReturnValue } from "../../domain/valueObjects/returnValue";
import IMessageBroker from "../providers/messageBroker";
import IOrdersRepository from "../repositories";
import IUseCase from "./protocol";
import { orderCancelled } from '../../utils/kafkaTopics.json'
import { OrderStatus } from "@prisma/client";

export default class CancelOrderUseCase implements IUseCase<string, Promise<IReturnValue<Order | null>>> {
    constructor(private readonly orderRepository: IOrdersRepository, private readonly messagebroker: IMessageBroker) { }

    async execute(id: string): Promise<IReturnValue<Order | null>> {
        const found = await this.orderRepository.findOrderById(id)

        if (!found) return { success: false, message: "Order not found", data: null, error: new ErrorClass('Order with given id not found', ResponseCodes.BadRequest) }

        const cancelled = await this.orderRepository.updateOrder({
            where: { id }, data: { status: OrderStatus.CANCELLED }
        })

        // Publish message
        try {
            await this.messagebroker.publish({
                topic: orderCancelled,
                messages: [
                    { value: JSON.stringify(cancelled) }
                ]
            })
        } catch (err) {

        }

        return {
            data: cancelled,
            success: true,
            message: "Order cancelled successfully"
        }
    }
}