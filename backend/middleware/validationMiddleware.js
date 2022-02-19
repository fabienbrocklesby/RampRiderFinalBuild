const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const complexityOptions = {
  min: 6,
  max: 50,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .lowercase()
    .required(),
  password: passwordComplexity(complexityOptions).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .lowercase()
    .required(),
  password: Joi.string()
    .min(6)
    .max(50)
    .required(),
});

const updateSchema = Joi.object({
  password: passwordComplexity(complexityOptions).required(),
  resetToken: Joi.string(),
});

const skateparkSchema = Joi.object({
  name: Joi.string().max(40).required(),
  size: Joi.string().min(4).max(7).required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  image: Joi.string().required(),
  directions: Joi.string().required(),
  category: Joi.string().min(5).max(10).required(),
});

const reviewSchema = Joi.object({
  title: Joi.string().max(40).required(),
  body: Joi.string().min(10).max(240).required(),
  rating: Joi.number().min(1).max(5).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
  skateparkSchema,
  reviewSchema,
};
