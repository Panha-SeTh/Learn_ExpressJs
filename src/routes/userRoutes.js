import { Router } from "express";
import {getAllUsers, getAllUsersId} from "../controllers/userController.js";
import {createUser} from "../controllers/userController.js";
import {updateUser} from "../controllers/userController.js";
import {getDelete} from "../controllers/userController.js";

const userRouter = Router(); //Create a router

userRouter.get("/", getAllUsers);

userRouter.post("/", createUser);

userRouter.get("/:id", getAllUsersId);

userRouter.put( "/:id", updateUser);

userRouter.delete("/:id", getDelete);

export default userRouter;