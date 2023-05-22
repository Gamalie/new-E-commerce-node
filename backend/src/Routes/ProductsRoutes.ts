import { Router } from "express";
import { addProduct,getAllProducts,getOneProduct,updateProduct,deleteProduct } from "../controllers/ProductsController";
import { tokenVerification } from "../middlewares/verifyTokens";

const productRoute=Router()

productRoute.post('',tokenVerification,addProduct)
productRoute.get('',getAllProducts)
productRoute.get('/:Product_id',getOneProduct)
productRoute.put('/:Product_id',tokenVerification,updateProduct)
productRoute.delete("/:Product_id", tokenVerification,deleteProduct)

export default productRoute
