import { celebrate, Joi } from 'celebrate';

export const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;
// eslint-disable-next-line no-useless-escape
export const regExpUrl = /https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i;

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regExpEmail),
    password: Joi.string().required(),
  }),
});

export const registerValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(regExpEmail),
    password: Joi.string().required(),
    avatar: Joi.string().pattern(regExpUrl),
  }),
});
