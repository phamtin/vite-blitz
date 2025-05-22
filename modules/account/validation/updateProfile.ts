export const nameRules =
[
  {
    required: true,
    message: 'This field is required',
  },
  {
    min: 2,
    message: 'This field must be at least 2 characters.',
  },
  {
    max: 10,
    message: 'This field must be at most 10 characters.',
  },
]

export const phoneNumberRules = 
  [
    {
      pattern: /^[0-9]*$/,
      message: 'Only numbers are allowed',
    },
    {
      max: 10,
      message: 'This field must be at most 10 characters.',
    },
  ]
  