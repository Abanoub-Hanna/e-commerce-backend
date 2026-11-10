export const validate = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate({ ...req.body, ...req.params, ...req.query },{ abortEarly: false },);
    let errorMessage = [];
    if (error) {
      //filter error message
      error.details.forEach((elm) => {
        errorMessage.push({ message: elm.message, path: elm.path[0] });
      });
      res.json(errorMessage);
    } else {
      next();
    }
  };
};
