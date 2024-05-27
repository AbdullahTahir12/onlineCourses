const Contact = require("../models/contact-model");

const contactForm = async (req, res, next) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ msg: "thank you!" });
  } catch (error) {
    return res.status(401).json({ msg: "msg not delivered" });
  }
};

module.exports = contactForm;
