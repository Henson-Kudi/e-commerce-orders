import { OrderStatus } from '@prisma/client';
import Joi from 'joi';

const OrderItem = Joi.object({
  // orderId: Joi.string().uuid().required(),
  productId: Joi.string().required(),
  productName: Joi.string().required(),
  productSKU: Joi.string().required(),
  quantity: Joi.number().positive().required().greater(0),
  price: Joi.number().positive().required(),
  total: Joi.number().positive().required(),
  tax: Joi.number().positive().required(),
});

const ShippingAddress = Joi.object({
  address: Joi.string().required(),
  buildingName: Joi.string().optional(),
  landmark: Joi.string().optional(),
  roomNo: Joi.string().optional(),
  floor: Joi.string().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zipCode: Joi.string().optional(),
});

const CrteateOrder = Joi.object({
  userId: Joi.string().optional().allow(null).allow(''),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  totalAmount: Joi.number().required(),
  discount: Joi.number().required(),
  currency: Joi.string().required(),
  // status: Joi.string().required().valid(...Object.keys(OrderStatus)).default(OrderStatus.PENDING),
  orderItems: Joi.array().items(OrderItem).required().min(1),
  shippingAddress: ShippingAddress,
  paymentId: Joi.string().required(),
});

const UpdateOrder = Joi.object({
  userId: Joi.string().optional(),
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  totalAmount: Joi.number().optional(),
  discount: Joi.number().optional(),
  currency: Joi.string().optional(),
  status: Joi.string()
    .optional()
    .valid(...Object.keys(OrderStatus)),
  orderItems: Joi.array().items(OrderItem).optional().min(1),
  shippingAddress: ShippingAddress,
  paymentId: Joi.string().optional(),
});

export function validateCreateOrder(
  data: unknown,
  options: Joi.AsyncValidationOptions = { abortEarly: false }
) {
  return CrteateOrder.validateAsync(data, options);
}

export function validateUpdateOrder(
  data: unknown,
  options: Joi.AsyncValidationOptions = { abortEarly: false }
) {
  return UpdateOrder.validateAsync(data, options);
}
