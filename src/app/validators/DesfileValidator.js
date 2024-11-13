import * as Yup from 'yup';

const DesfileValidator = Yup.object().shape({
  nome: Yup.string()
    .required('O nome do desfile é obrigatório.')
    .min(3, 'O nome do desfile deve ter pelo menos 3 caracteres.')
    .max(100, 'O nome do desfile não pode ter mais de 100 caracteres.'),

  marca: Yup.string()
    .required('A marca é obrigatória.'),

  designer: Yup.string()
    .required('O nome do designer é obrigatório.'),

  horario: Yup.string()
    .required('O horário é obrigatório.')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Horário inválido. Use o formato HH:MM.'),

  data: Yup.string()
    .required('A data é obrigatória.')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida. Use o formato YYYY-MM-DD.')
    .test('is-future', 'A data deve ser no futuro.', (value) => {
      const today = new Date();
      return new Date(value) > today;
    })
});

export default DesfileValidator;