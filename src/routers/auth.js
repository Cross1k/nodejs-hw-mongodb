import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshUserController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));
