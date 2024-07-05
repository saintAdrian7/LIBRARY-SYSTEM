import { Request,Response } from "express";
import { findAllUsers,findUserById, removeUser, modifyUser } from "../services/UserService";
import { UserDoesNotExist } from "../utils/libraryErrors";
import userDaos from "../daos/userDaos";

export async function getAllUsers(req:Request, res:Response){
    try{
      let users = await findAllUsers();
        res.status(200).json({ users})
        console.log(users)
    }catch(error:any){
        res.status(500).json({message:"Internal Server Error", error:error.message})
    }
}

export async function getUserById(req:Request, res:Response){
    try{
        let id = req.params.id;
        let user = await findUserById(id);
        res.status(200).json({message:"User retrived successfully", user})
    }catch(error:any){
        if(error instanceof UserDoesNotExist){
            res.status(404).json({message:"User requested does not exist"})
        }else{
            res.status(500).json({message:"Could not find User", error:error.message})
        }
        
    }
}

export async function updateUser(req:Request,res:Response){

    let user = req.body
    try{

        let updatedUser = await modifyUser(user);
        res.status(200).json({message:"User updated successfully", updatedUser})
    }
    catch(error:any){
        if(error instanceof UserDoesNotExist){
            res.status(404).json({message:"User requested does not exist"})
        }else{
            res.status(500).json({message:"Unable to update user currently", error:error.message})
        }
  

    }
}

export async function deleteUser (req:Request, res:Response){
    try{
        let id:string = req.params.id;
         await removeUser(id);
        res.status(200).json({message:"User deleted successfully"})
    }
    catch(error:any){
        if(error instanceof userDaos){
            res.status(404).json({message:"user requested does not exist"})
        }else{
            res.status(500).json({message:"Unable to delete user currently", error:error.message})
        }
        
    }
}

