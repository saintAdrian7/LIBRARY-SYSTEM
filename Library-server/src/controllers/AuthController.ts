import { Request, Response } from "express";
import { Register, login } from "../services/UserService";
import { User } from "../models/User";
import { IUserModel } from "../daos/userDaos";
import { invalidEmailorPasswordError } from "../utils/libraryErrors";

export async function handleRegister(req: Request, res: Response) {
    const user: User = req.body;

    try {
        const registeredUser = await Register(user);

        res.status(200).json({
            message: "User successfully created",
            user: {
                id: registeredUser._id,
                type: registeredUser.type,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email
            }
        });
    } catch (error: any) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            res.status(409).json({ message: "User with email already exists", error: error.message });
        } else {
            res.status(500).json({
                message: "Unable to register user",
                error: error.message
            });
        }
    }
}

export async function handleLogin(req: Request, res: Response) {
    const credentials = req.body;
    try {
        const loggedIn: IUserModel = await login(credentials);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: loggedIn._id,
                type: loggedIn.type,
                firstName: loggedIn.firstName,
                lastName: loggedIn.lastName,
                email: loggedIn.email
            }
        });
    } catch (error: any) {
        if(error instanceof invalidEmailorPasswordError){
            res.status(401).json({message:"Unable to login user at this time", error:error.message})
        }else{
            res.status(500).json({
                message: "Unable to login user at this time",
                error: error.message
            });
        }
        
    }
}
