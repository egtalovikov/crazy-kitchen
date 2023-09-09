import { object, string, TypeOf } from 'zod'

export type LoginInputs = TypeOf<typeof loginSchema>
export type RegisterInputs = TypeOf<typeof registerSchema>

export const loginSchema = object({
  login: string()
    .min(3, 'Имя пользователя должно содержать не менее 3 символов')
    .max(20, 'Имя пользователя не может содержать более 20 символов')
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Имя пользователя должно содержать только латинские буквы, цифры, дефисы и нижние подчеркивания',
    })
    .refine(value => !/^\d+$/.test(value), {
      message: 'Имя пользователя не может состоять только из цифр',
    })
    .refine(value => !/\s/.test(value), {
      message: 'Имя пользователя не может содержать пробелы',
    }),
  password: string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .max(40, 'Пароль не может содержать более 40 символов')
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        'Пароль должен содержать хотя бы одну заглавную букву и одну цифру',
    }),
  second_name: string()
    .min(1, 'Имя должно содержать хотя бы одну букву')
    .max(40, 'Имя не может содержать более 40 символов')
    .regex(/^[A-Z][a-zA-Z-]*$|^[А-Я][а-яА-Я-]*$/, {
      message:
        'Фамилия должна содержать только латинские или кириллические буквы, дефисы и буквы',
    }),
  first_name: string()
    .min(1, 'Имя должно содержать хотя бы одну букву')
    .max(40, 'Имя не может содержать более 40 символов')
    .regex(/^[A-Z][a-zA-Z-]*$|^[А-Я][а-яА-Я-]*$/, {
      message:
        'Имя должно начинаться с заглавной буквы и содержать только латинские или кириллические буквы, дефисы и буквы',
    }),
  email: string()
    .min(1, 'Email должен содержать хотя бы один символ')
    .max(100, 'Email не может содержать более 100 символов')
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: 'Email должен соответствовать формату example@example.com',
    }),
  phone: string()
    .min(10, 'Номер телефона должен содержать не менее 10 цифр')
    .max(15, 'Номер телефона не может содержать более 15 цифр')
    .regex(/^\+?\d+$/, {
      message:
        'Номер телефона должен состоять из цифр и может начинаться с плюса',
    }),
})

export const registerSchema = object({
  login: string()
    .min(3, 'Имя пользователя должно содержать не менее 3 символов')
    .max(20, 'Имя пользователя не может содержать более 20 символов')
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Имя пользователя должно содержать только латинские буквы, цифры, дефисы и нижние подчеркивания',
    })
    .refine(value => !/^\d+$/.test(value), {
      message: 'Имя пользователя не может состоять только из цифр',
    })
    .refine(value => !/\s/.test(value), {
      message: 'Имя пользователя не может содержать пробелы',
    }),
  password: string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .max(40, 'Пароль не может содержать более 40 символов')
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        'Пароль должен содержать хотя бы одну заглавную букву и одну цифру',
    }),
})