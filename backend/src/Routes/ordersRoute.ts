import { Router } from "express";
import { makeOrder,getAllOrders,getOrderByUserId,updateOrderStatus,deleteOrder} from "../controllers/orderController"
import { tokenVerification } from "../middlewares/verifyTokens";
const orderRoute=Router()

orderRoute.post('',makeOrder)
orderRoute.get('',tokenVerification,getAllOrders)
orderRoute.get('/:users',getOrderByUserId)
orderRoute.delete('/:order_id',deleteOrder)
orderRoute.put('/:users/:order_id',tokenVerification, updateOrderStatus)



export default orderRoute