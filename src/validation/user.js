import Joi from 'joi';
import { EMAIL_REGEXP } from '../constants/index.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().min(6).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().min(6).required(),
});
