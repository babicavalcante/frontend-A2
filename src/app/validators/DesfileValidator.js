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

  modelo: Yup.string()
    .required('O modelo é obrigatório.'),

  horario: Yup.string()
    .required('O horário é obrigatório.')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Horário inválido. Use o formato HH:MM.')
    .test('valid-time', 'O horário não pode ser igual ou superior a 24:00', value => {
        const [hours, minutes] = value.split(':').map(Number);
        return hours < 24;
    }),

  data: Yup.string()
    .required('A data é obrigatória.')
    .test('is-future', 'A data deve ser no futuro.', (value) => {
      const today = new Date();
      return new Date(value) > today;
    }),

  descricao: Yup.string().required('A descrição é obrigatória.')
});

export default DesfileValidator;
