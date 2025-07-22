import * as yup from 'yup';

export const createProductSchema = yup.object({
  name: yup
    .string()
    .required('O nome do produto é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(100, 'O nome não pode exceder 50 caracteres')
    .trim(),
  description: yup
    .string()
    .optional()
    .max(500, 'A descrição não pode exceder 500 caracteres')
    .trim(),
  price: yup
    .number()
    .required('O preço é obrigatório')
    .positive('O preço deve ser maior que zero')
    .max(1000000, 'O preço não pode exceder 1.000.000')
    .test(
      'maxDigitsAfterDecimal',
      'O preço deve ter no máximo 2 casas decimais',
      (value) => Number.isInteger(value * 100),
    ),
  amount: yup
    .number()
    .required('A quantidade é obrigatória')
    .integer('A quantidade deve ser um número inteiro')
    .min(0, 'A quantidade não pode ser negativa')
    .max(10000, 'A quantidade não pode exceder 10.000'),
});

export const updateProductSchema = yup.object({
  id: yup
    .number()
    .required('O ID do produto é obrigatório')
    .integer('O ID deve ser um número inteiro')
    .positive('O ID deve ser maior que zero'),
  name: yup
    .string()
    .optional()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(100, 'O nome não pode exceder 100 caracteres')
    .trim(),
  description: yup
    .string()
    .optional()
    .max(500, 'A descrição não pode exceder 500 caracteres')
    .trim(),
  price: yup
    .number()
    .optional()
    .positive('O preço deve ser maior que zero')
    .max(1000000, 'O preço não pode exceder 1.000.000')
    .test(
      'maxDigitsAfterDecimal',
      'O preço deve ter no máximo 2 casas decimais',
      (value) => (value === undefined ? true : Number.isInteger(value * 100)),
    ),
  amount: yup
    .number()
    .optional()
    .integer('A quantidade deve ser um número inteiro')
    .min(0, 'A quantidade não pode ser negativa')
    .max(10000, 'A quantidade não pode exceder 10.000'),
});

export const deleteProductSchema = yup.object({
  id: yup
    .number()
    .required('O ID do produto é obrigatório')
    .integer('O ID deve ser um número inteiro')
    .positive('O ID deve ser maior que zero'),
});