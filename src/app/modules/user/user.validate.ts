import z from 'zod';
import { IsActive, Role } from './user.types';

export const createUserZodSchema = z.object({
  name: z.string().min(2, { message: 'Name should be at least 2 characters' }).max(50, { message: 'Too long! Name should be max 50 characters' }).trim(),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'Invalid email address',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(val => /\d/.test(val), {
      message: 'Password must contain at least one number',
    })
    .refine(val => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val), {
      message: 'Password must contain at least one special character',
    }),

  phone: z
    .string()
    .regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, {
      message: 'Invalid Bangladeshi phone number',
    })
    .optional(),

  address: z.string().max(200, { message: 'Address cannot exceed 200 characters' }).optional(),
});

export const updateUserZodSchema = z.object({
  name: z.string('Name must be string').min(2, 'Name should be at least 2 character').max(50, 'Too long! Name should be max 50 character').trim().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(val => /\d/.test(val), {
      message: 'Password must contain at least one number',
    })
    .refine(val => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val), {
      message: 'Password must contain at least one special character',
    })
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, 'Invalid Bangladeshi phone number')
    .optional(),
  address: z.string('Address must be a string').max(200, 'Address cannot exceed 200 character').optional(),
  isDeleted: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  role: z.enum(Object.values(Role)).optional(),
  isActive: z.enum(Object.values(IsActive)).optional(),
});
