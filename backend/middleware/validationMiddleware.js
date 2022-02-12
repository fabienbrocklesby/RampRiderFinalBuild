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

module.exports = {
    registerSchema,
    loginSchema,
}