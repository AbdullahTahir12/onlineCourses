// parseAsync middleware:  to validate the request body against the defined Schema

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    //     res.status(400).json({ msg: err.errors[0].message });
    const status = 422;
    const message = "fill the input properly";
    const extraDetails = err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails,
    };
    console.log(error);
    next(error);
  }
};
module.exports = validate;
