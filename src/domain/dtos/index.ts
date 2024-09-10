import { OrderStatus } from '../entities';

export type PaginationOptions = {
  page?: number;
  limit?: number;
};

export type OrderItemDTO = {
  // orderId not required because it'll be connected automatically by prisma
  productId: string;
  productName: string;
  productSKU: string;
  quantity: number;
  price: number;
  total: number;
  tax: number;
};

export type ShippingAddressDTO = {
  address: string;
  buildingName?: string;
  landmark?: string;
  roomNo?: string;
  floor?: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
};

// Define how data will be transfered
export type CreateOrderDTO = {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  totalAmount: number;
  discount: number;
  currency: string;
  orderItems: OrderItemDTO[];
  shippingAddress: ShippingAddressDTO;
  paymentId: string;
};

export type UpdateOrderDTO = {
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  totalAmount?: number;
  discount?: number;
  currency?: string;
  status?: OrderStatus;
  orderItems?: OrderItemDTO[];
  shippingAddressId?: string;
  shippingAddress?: ShippingAddressDTO;
  paymentId?: string;
};

export type FindOrdersFilter = {
  userId?: string | string[];
  name?: string;
  email?: string | string[];
  phone?: string | string[];
  totalAmount?: { min?: number; max?: number };
  discount?: { min?: number; max?: number };
  currency?: string | string[];
  status?: OrderStatus | OrderStatus[];
  productId?: string | string[];
  productName?: string | string[];
  productSKU?: string | string[];
  paymentId?: string | string[];
};
export type FindOrdersOptions = {
  withShippingAddress?: boolean;
  withItems?: boolean;
};

export type FindOrdersQuery = {
  filter?: FindOrdersFilter;
  options?: FindOrdersOptions & PaginationOptions;
};
