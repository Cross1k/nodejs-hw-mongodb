import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit} characters',
    'string.max': 'Name should be at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should be at least {#limit} characters',
    'string.max': 'Phone number should be at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email should have at least {#limit} domain segments',
  }),
  isFavorite: Joi.boolean().default(false).messages({
    'boolean.base': 'Favorite should be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required()
    .messages({
      'string.base': 'Type should be a string',
      'string.valid': 'Valid options is work, home or personal',
      'any.required': 'Type is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit} characters',
    'string.max': 'Name should be at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should be at least {#limit} characters',
    'string.max': 'Phone number should be at most {#limit} characters',
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email should have at least {#limit} domain segments',
  }),
  isFavorite: Joi.boolean().default(false).messages({
    'boolean.base': 'Favorite should be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required()
    .messages({
      'string.base': 'Type should be a string',
      'string.valid': 'Valid options is work, home or personal',
    }),
});
