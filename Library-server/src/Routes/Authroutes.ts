import  express  from "express";
import {handleLogin, handleRegister} from "../controllers/AuthController";
import { Schemas, validateSchema } from "../middleware/validation";

const router = express.Router()

router.post('/register', validateSchema(Schemas.user.create, 'body'), handleRegister)

router.post('/login',validateSchema(Schemas.user.login, 'body'), handleLogin)

export = router