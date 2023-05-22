import { Router } from "express";
import {addUser,getAllUser,getUserByEmail,updateUser,deleteUser,loginUser, resetPassword} from "../controllers/userController";
import { tokenVerification } from "../middlewares/verifyTokens";
// import {getAllUser} from "../controller/userController"

const userRouter= Router()


userRouter.post('',addUser)
userRouter.get('',tokenVerification,getAllUser)
userRouter.get('/:user_email',tokenVerification,getUserByEmail)
userRouter.put('/:user_id',tokenVerification,updateUser)
userRouter.delete('/:user_id',tokenVerification,deleteUser)
userRouter.post('/login',loginUser)
userRouter.put('/rs/:user_id',resetPassword)

export default userRouter 