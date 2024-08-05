import { FindOrdersFilter } from "../../../domain/dtos";

export default function setupOdersQuery(filter: FindOrdersFilter) {
    const query: Record<string, unknown> = {};

    if (filter?.name) {
        query.name = {
            contains: filter.name,
            mode: 'insensitive',
        };
    }
    if (filter?.email) {
        query.email = Array.isArray(filter.email) ? {
            ind: filter.email,
        } : {
            contains: filter.email,
            mode: 'insensitive',
        };
    }
    if (filter?.phone) {
        query.phone = Array.isArray(filter.phone) ? {
            ind: filter.phone,
        } : {
            contains: filter.phone,
            mode: 'insensitive',
        };
    }
    if (filter?.productName) {
        query.productName = Array.isArray(filter.productName) ? {
            ind: filter.productName,
        } : {
            contains: filter.productName,
            mode: 'insensitive',
        };
    }
    if (filter?.productSKU) {
        query.productSKU = Array.isArray(filter.productSKU) ? {
            ind: filter.productSKU,
        } : {
            contains: filter.productSKU,
            mode: 'insensitive',
        };
    }

    if (filter?.userId) {
        query.userId = Array.isArray(filter.userId)
            ? { in: filter.userId }
            : filter.userId;
    }

    if (filter?.currency) {
        query.currency = Array.isArray(filter.currency)
            ? { in: filter.currency }
            : filter.currency;
    }
    if (filter?.status) {
        query.status = Array.isArray(filter.status)
            ? { in: filter.status }
            : filter.status;
    }
    if (filter?.productId) {
        query.productId = Array.isArray(filter.productId)
            ? { in: filter.productId }
            : filter.productId;
    }
    if (filter?.paymentId) {
        query.paymentId = Array.isArray(filter.paymentId)
            ? { in: filter.paymentId }
            : filter.paymentId;
    }

    if (filter?.discount) {
        const discount: Record<string, unknown> = {};
        if (filter.discount.min && filter.discount.min > 0) {
            discount.gte = filter.discount.min;
        }
        if (filter.discount.max && filter.discount.max > 0) {
            discount.lte = filter.discount.max;
        }

        Object.keys(discount).length && (query.discount = discount);
    }

    if (filter?.totalAmount) {
        const totalAmount: Record<string, unknown> = {};
        if (filter.totalAmount.min && filter.totalAmount.min > 0) {
            totalAmount.gte = filter.totalAmount.min;
        }
        if (filter.totalAmount.max && filter.totalAmount.max > 0) {
            totalAmount.lte = filter.totalAmount.max;
        }

        Object.keys(totalAmount).length && (query.totalAmount = totalAmount);
    }

    return query;
}