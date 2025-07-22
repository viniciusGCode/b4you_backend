import * as yup from 'yup';

export const createProductSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  price: yup.number().required(),
  amount: yup.number().required(),
});

export const updateProductSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().optional(),
  description: yup.string().optional(),
  price: yup.number().optional(),
  amount: yup.number().optional(),
});

export const deleteProductSchema = yup.object({
  id: yup.number().required(),
});
