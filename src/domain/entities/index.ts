// Define your schema entities
import {
  OrderStatus as OrderStatusEntity,
  Order as OrderEntity,
  OrderItem as OrderItemEntity,
  ShippingAddress as ShippingAddressEntity,
} from '@prisma/client';

export type OrderStatus = OrderStatusEntity;
export type Order = OrderEntity;
export type OrderItem = OrderItemEntity;
export type ShippingAddress = ShippingAddressEntity;
