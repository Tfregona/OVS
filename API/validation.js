// Validation JOI
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    sexe: Joi.string().required(),
    age: Joi.date().required(),
    password: Joi.string().required(),
    avatar: Joi.string().allow(""),
  });

  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

// Sport Validation
const sportValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    url_image: Joi.string().required(),
    url_wiki: Joi.string().required(),
  });

  return schema.validate(data);
};

// Post Validation
const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    localisation: Joi.string().required(),
    level: Joi.string().required(),
    sport: Joi.string().required(),
    date: Joi.date().required(),
    places: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.sportValidation = sportValidation;
module.exports.postValidation = postValidation;
