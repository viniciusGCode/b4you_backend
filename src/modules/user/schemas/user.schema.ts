import * as yup from 'yup';

export const loginUserValidate = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});
