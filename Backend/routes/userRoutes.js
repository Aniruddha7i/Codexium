import { Router } from 'express';
import * as userControllers from '../Controllers/userController.js';
import { body } from 'express-validator';
import * as Auth from '../middleware/Auth.js';
const userRoutes = Router();

userRoutes.post('/register',body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    userControllers.createUserController);

userRoutes.post('/login',body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    userControllers.loginUserController);

userRoutes.get('/profile', Auth.authUser, userControllers.profileController);
export default userRoutes;