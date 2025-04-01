import express from 'express'
import { createUser, deleteUser, getAllUsers, loginUser, updateUser, getUserById } from '../controllers/users.controller.js'

const router=express.Router()

router.get('/',getAllUsers)

router.get("/:id", getUserById); 

router.post('/login',loginUser)

router.post('/',createUser)

router.put("/:id", updateUser);

router.delete('/:id',deleteUser)

export default router;   