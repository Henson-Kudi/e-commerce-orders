import { FindOrdersQuery } from "../../domain/dtos";
import { Order } from "../../domain/entities";
import { IReturnValueWithPagination } from "../../domain/valueObjects/returnValue";
import IOrdersRepository from "../repositories";
import setupOdersQuery from "./helpers";
import setupPagination from "./helpers/setupPagination";
import IUseCase from "./protocol";

export default class GetOrdersUseCase implements IUseCase<FindOrdersQuery, Promise<IReturnValueWithPagination<Order[]>>> {
    constructor(private readonly orderRepository: IOrdersRepository) { }

    async execute(params: FindOrdersQuery): Promise<IReturnValueWithPagination<Order[]>> {
        const query = setupOdersQuery(params.filter)
        const pagination = setupPagination({ page: params.options?.page, limit: params.options?.limit })

        const total = await this.orderRepository.countOrders({ where: query })

        const found = await this.orderRepository.findOrders({
            where: query,
            include: {
                orderItems: params?.options?.withItems !== false,
                shippingAddress: params?.options?.withShippingAddress ?? undefined
            },
            take: pagination.limit,
            skip: pagination.skip
        });

        return {
            data: {
                data: found,
                ...pagination,
                total
            },
            success: true,
            message: "Orders found"
        }
    }

}