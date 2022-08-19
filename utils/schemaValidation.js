const Joi = require("joi");

function validateContact(contact) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    documentId: Joi.string().required(),
  });

  return schema.validate(contact);
}

module.exports = { validateContact };
