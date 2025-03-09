import { z } from 'zod'

const issueRegex = new RegExp(/[1-2]{1}/)
const volumeRegex = new RegExp(/^(100|[1-9]?[0-9])$/)

export const signinFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is  required' })
    .email({ message: 'Invalid email' }),
  // .includes('uniben.edu', { message: 'Email must be valid UNIBEN email' }),
  // .email({ message: 'Invalid email address' }),

  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be a minimum of 6 characters' }),
})

export const newUserSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'First name is required' }),
  lastName: z.string().trim().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is  requird' })
    .email({ message: 'Invalid email' }),
  role: z.string().min(1, { message: 'please select user role' }),
  // .includes('uniben.edu', { message: 'Email must be valid UNIBEN email' }),
})

export const activateAccountSchema = z.object({
  defaultPassword: z
    .string()
    .min(6, { message: 'Password must be a minimum of 6 characters' }),
  newPassword: z
    .string()
    .min(6, { message: 'Password must be a minimum of 6 characters' }),
})

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'E-mail is  requird' })
    .email({ message: 'Enter a valid e-mail' }),
  // .includes('uniben.edu', { message: 'Email must be valid UNIBEN email' }),
  isHuman: z.boolean().refine((val) => val === true, {
    message: 'captcha must be completed',
  }),
})

export const passwordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be a minimum of 6 characters' }),
  // .includes('uniben.edu', { message: 'Email must be valid UNIBEN email' }),
})

const articleAuthorSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  department: z.string().min(1, { message: "author's department is required" }),
  institution: z
    .string()
    .min(1, { message: "author's intitution is required" }),
})

const fileSizeInMb = (sizeInBytes) => sizeInBytes / 1024 ** 2
const MAX_FILESIZE = 10
const fileInputSchema = z
  .custom()
  .refine((files) => Array.from(files ?? []).length !== 0, {
    message: 'Article PDF is required',
  })
  .refine((files) =>
    Array.from(files ?? []).every(
      (file) => +fileSizeInMb(file.size).toFixed(2) <= MAX_FILESIZE,
      {
        message: 'maximum file size is 10MB',
      }
    )
  )
  .refine(
    (files) =>
      Array.from(files ?? []).every((file) => {
        return 'application/pdf' === file?.type
      }),
    { message: 'File type must be PDF' }
  )

export const articleFormSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required' }),
  authors: z.array(articleAuthorSchema),
  volume: z
    .string()
    .min(1, 'volume field is required')
    .refine(
      (value) => (typeof Number(value) === 'number', 'issue must be a number')
    ),
  issue: z
    .string()
    .min(1, 'issue field is required')
    .max(1, 'volume must be a single digit number')
    .refine(
      (value) => (
        (typeof Number(value) === 'number' && Number(value) === 1) ||
          Number(value) === 2,
        'issue must be a number'
      )
    )
    .refine(
      (value) => Number(value) === 1 || Number(value) === 2,
      'issue number must be 1 or 2 '
    ),
  startPage: z.number({
    required_error: 'start page number is required',
    invalid_type_error: 'start page must be a number',
  }),
  endPage: z.number({
    required_error: 'end page number is required',
    invalid_type_error: 'end page must be a number',
  }),
  abstract: z.string().min(1, { message: 'Abstract is required' }),
  keywords: z.array(z.string()).refine((keywords) => keywords.length, {
    message: 'Keyword must be provided',
  }),
  jelClassification: z.array(z.string()).optional(),
})

export const newArticleFormSchema = articleFormSchema.extend({
  pdfFile: fileInputSchema,
})

export const articleSchemaForServer = articleFormSchema.extend({
  pdfFile: z
    .union([
      z
        .string()
        .url({ message: 'provide valid url' })
        .startsWith('https://firebasestorage.googleapis.com', {
          message: 'provide valid url',
        })
        .includes('bijed-f265e.appspot.com', { message: 'provide valid' }),
      z.null(),
    ])
    .optional(),
})

export const editArticleFormSchema = articleFormSchema.extend({
  pdfFile: z.union([fileInputSchema, z.null()]).optional(),
})

export const announcementSchema = z.object({
  title: z.string().trim().min(1, { message: 'title is required' }),
  description: z
    .string()
    .min(20, { message: 'description is required' })
    .max(100, { message: 'Exceeded maximum character length for description' }),
  dueDate: z.date({ message: 'enter a valid date' }),
  content: z
    .string()
    .min(30, { message: 'Content must have minimum of 30 characters' }),
})

export const IssueFormSchema = z.object({
  issueNumber: z
    .string()
    .min(1, 'issue field is required')
    .max(1, 'volume must be a single digit number')
    .refine(
      (value) => (
        (typeof Number(value) === 'number' && Number(value) === 1) ||
          Number(value) === 2,
        'issue must be a number'
      )
    )
    .refine(
      (value) => Number(value) === 1 || Number(value) === 2,
      'issue number must be 1 or 2 '
    ),
  issueYear: z.date({ message: 'enter a valid date' }),
  volume: z
    .string()
    .min(1, 'volume field is required')
    .refine(
      (value) => (typeof Number(value) === 'number', 'issue must be a number')
    ),
})

export const editorialBoardSchema = z.object({
  content: z
    .string()
    .min(200, { message: 'Content must have minimum of 30 characters' }),
})

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }).trim(),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is  requird' })
    .email({ message: 'Please enter a valid email' }),
  subject: z.string().min(1, { message: 'Subject is required' }).trim(),
  body: z.string().min(20, { message: 'message is required' }).trim(),
  isHuman: z.boolean().refine((val) => val === true, {
    message: 'captcha must be completed',
  }),
})

///(^[a-z]+)(@uniben\.edu|@bijed\.com\.ng)|(^[a-z]+\.[a-z]+)@uniben\.edu$/gm
