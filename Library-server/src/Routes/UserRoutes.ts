import express from 'express'
import {getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/UserController'
import { Schema } from 'mongoose'
import { valid } from 'joi'
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id',  getUserById)
router.put('/',   updateUser) 
router.delete('/:id',  deleteUser)

export default router