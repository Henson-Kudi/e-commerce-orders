import { UpdateOrderDTO } from "../../domain/dtos";
import { Order } from "../../domain/entities";
import { ResponseCodes } from "../../domain/enums/responseCode";
import ErrorClass from "../../domain/valueObjects/error";
import { IReturnValue } from "../../domain/valueObjects/returnValue";
import logger from "../../utils/logger";
import IMessageBroker from "../providers/messageBroker";
import IOrdersRepository from "../repositories";
import IUseCase from "./protocol";
import { orderUpdated } from '../../utils/kafkaTopics.json'
import { validateUpdateOrder } from "../../utils/joi";

export default class UpdateOrderUseCase implements IUseCase<
    { id: string, data: UpdateOrderDTO }, Promise<IReturnValue<Order | null>>> {
    constructor(private readonly orderRepository: IOrdersRepository, private readonly messageBroker: IMessageBroker) { }

    async execute(params: { id: string; data: UpdateOrderDTO; }): Promise<IReturnValue<Order | null>> {
        // Validate update data
        await validateUpdateOrder(params.data)

        const foundOrder = await this.orderRepository.findOrderById(params.id);

        if (!foundOrder) {
            return {
                success: false,
                message: "Order not found",
                data: null,
                error: new ErrorClass('Order not found', ResponseCodes.BadRequest)
            }
        }

        const shippingAddress = params.data.shippingAddress
        const items = params.data.orderItems

        const updatedOrder = await this.orderRepository.updateOrder({
            where: { id: params.id },
            data: {
                ...params.data,
                shippingAddress: shippingAddress ? {
                    upsert: {
                        where: { orderId: params.id },
                        create: {
                            ...shippingAddress
                        },
                        update: {
                            ...shippingAddress
                        }
                    }
                } : undefined,
                orderItems: items && items.length ? {
                    deleteMany: {
                        orderId: params.id //  deletes all records of items for this order
                    },
                    create: items // creates a new list of order items for this order
                } : undefined

            }
        });

        // Publish order updated message
        try {
            await this.messageBroker.publish({
                topic: orderUpdated,
                messages: [{
                    value: JSON.stringify(updatedOrder)
                }]
            })
        } catch (error) {
            logger.error((error as Error).message, error)
        }

        return {
            success: true,
            message: "Order updated successfully",
            data: updatedOrder
        }
    }
}