import { Router } from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createUserZodSchema, updateUserZodSchema } from './user.validate';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from './user.types';

const router = Router();

// routes
// create new user route
router.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser);
router.patch('/update/:id', validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser);
router.get('/all-users', checkAuth('ADMIN'), UserControllers.getAllUser);

export const UserRoutes = router;
