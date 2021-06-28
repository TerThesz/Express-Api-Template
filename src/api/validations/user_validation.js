const yup = require('yup');

module.exports = yup.object({
  // To Do add other errors
  name: yup.string().required("userCodes.800.name"),
  password: yup.string().min(8).max(20).required("userCodes.800.password"),
  email: yup.string().email().required("userCodes.800.email")
});