import { OrderStatus } from "@prisma/client";
import database from "../../infrastructure/database";
import IOrdersRepository from "../repositories";
import IUseCase from "./protocol";

export default class QueryOrdersUsecase implements IUseCase {

    constructor(private readonly repo: IOrdersRepository) { }

    async execute(): Promise<void> {
        const query = database.order.findMany({
            select: {
                id: true,
                createdAt: true,
                userId: true,
                totalAmount: true,
                status: true,
            }
        })

        const arr = [...['dsdsss']]
        

        database.$queryRaw`SELECT * FROM Order, WHERE `
    }
}