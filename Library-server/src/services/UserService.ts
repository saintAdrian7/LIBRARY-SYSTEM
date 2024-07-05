import bcrypt from 'bcrypt';
import { config } from '../config';
import userDaos, { IUserModel } from '../daos/userDaos';
import { User } from '../models/User';
import { UnableToSaveUserError, UserDoesNotExist, invalidEmailorPasswordError } from '../utils/libraryErrors';

export async function Register(user: User): Promise<IUserModel> {
    const ROUNDS = config.server.rounds;

    try {
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
        const saved = new userDaos({ ...user, password: hashedPassword });
        return await saved.save();
    } catch (error: any) {
        throw new UnableToSaveUserError(error.message);
    }
}

export async function login(credentials: { email: string, password: string }): Promise<IUserModel> {
    const { email, password } = credentials;

    try {
        const user = await userDaos.findOne({ email });
        if (!user) {
            throw new invalidEmailorPasswordError("Invalid Email");
        } else {
            const validPassword: boolean = await bcrypt.compare(password, user.password);
            if (validPassword) {
                return user;
            } else {
                throw new invalidEmailorPasswordError("Invalid Password");
            }
        }
    } catch (error: any) {
        throw error;
    }
}


export async function findAllUsers():Promise<IUserModel[]>{
    try {
      const users = await userDaos.find();
      return users;
    }catch(error){
        return []
    }
}


export async function findUserById(userId:string): Promise<IUserModel>{
    try{
     const user = await userDaos.findById(userId);
     if(user)
        return user

     throw new UserDoesNotExist('User does not exist with this Id')
    }catch(error:any){
      throw error
}
}


export async function modifyUser(user:IUserModel): Promise<IUserModel>{
    try{
       let id = await userDaos.findByIdAndUpdate(user._id, user, {new: true});
       if(!id) throw new UserDoesNotExist("User does not exist with this Id")
       return user
    }catch(error:any){
       throw error
    }
}

export async function removeUser(userId: string): Promise<string>{
    try{
    let deleted =  await userDaos.findByIdAndDelete(userId)
    if(!deleted) throw new UserDoesNotExist("User does not exist with this Id")
     return "User deleted successfully"
    }catch(error:any){
        throw error
    }
}