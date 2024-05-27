const { z } = require("zod");

// creating an object schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "email must be at least 3 characters" })
    .max(255, { message: "email must be at most 255 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(3, { message: "password must be at least 3 characters" })
    .max(255, { message: "password must be at most 255 characters" }),
});

const signupSchema = z.object({
  username: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, { message: "name must be at least 3 characters" })
    .max(255, { message: "name must be at most 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "email must be at least 3 characters" })
    .max(255, { message: "email must be at most 255 characters" }),
  phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(3, { message: "phone must be at least 3 characters" })
    .max(255, { message: "phone must be at most 255 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(3, { message: "password must be at least 3 characters" })
    .max(255, { message: "password must be at most 255 characters" }),
});

module.exports = { signupSchema, loginSchema };
