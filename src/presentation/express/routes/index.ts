// You can modify this file the way you like but make sure to export the router as default so that it initialised in index.ts
import { Router } from 'express';
import getOrders from './handlers/getOrders';
import createOrder from './handlers/createOrder';
import deleteOrders from './handlers/deleteOrders';
import deleteOrder from './handlers/deleteOrder';
import getOrder from './handlers/getOrder';
import updateOrder from './handlers/updateOrder';
import cancelOrder from './handlers/cancelOrder';

const router = Router();

// Define your routes here
router.route('/').get(getOrders).post(createOrder).delete(deleteOrders)

router.route('/:id').get(getOrder).put(updateOrder).delete(cancelOrder)

router.delete('/delete-order/:id', deleteOrder)

export default router;
