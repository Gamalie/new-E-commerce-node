import { Router } from "express";
import { addToCart,getAllInCart,getSingleItemInCart,deleteFromCart,increaseItemInCart,decreaseItemInCart} from "../controllers/cartController"

const cartRoute=Router()

cartRoute.post('',addToCart)
cartRoute.get('/:users',getAllInCart)
cartRoute.get('/:Product_id/:users',getSingleItemInCart)
cartRoute.put('/:Product_id/:users',increaseItemInCart)
cartRoute.put('/dec/:Product_id/:users',decreaseItemInCart)
cartRoute.delete('/:Product_id/:users',deleteFromCart)
export default cartRoute