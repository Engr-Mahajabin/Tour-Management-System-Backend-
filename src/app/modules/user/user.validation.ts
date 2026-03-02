import z from "zod";
import { IsActive, Role } from "./user.interface";

//User Registration validation middleware:
export const createUserZodSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),

  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),

  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),

  phone: z
    .string({
      invalid_type_error: "Phone number must be a string",
    })
    .min(11, { message: "Phone number is too short" })
    .max(14, { message: "Phone number is too long" })
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
      message: "Please enter a valid BD mobile number (e.g., 017XXXXXXXX)",
    })
    .optional(),

  address: z
    .string({
      invalid_type_error: "Address must be a string",
    })
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(200, { message: "Address is too long" })
    .optional(),
});

//User Update validation middleware:
export const updateUserZodSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" })
    .optional(),

  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .optional(),

  role: z.enum(Object.values(Role) as [string]).optional(),

  isActive: z.enum(Object.values(IsActive) as [string]).optional(),

  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),

  isVerified: z
    .boolean({ invalid_type_error: "isVerified must be true or false" })
    .optional(),

  phone: z
    .string({
      invalid_type_error: "Phone number must be a string",
    })
    .min(11, { message: "Phone number is too short" })
    .max(14, { message: "Phone number is too long" })
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
      message: "Please enter a valid BD mobile number (e.g., 017XXXXXXXX)",
    })
    .optional(),

  address: z
    .string({
      invalid_type_error: "Address must be a string",
    })
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(200, { message: "Address is too long" })
    .optional(),
});
