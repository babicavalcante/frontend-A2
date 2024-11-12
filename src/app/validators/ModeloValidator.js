import * as Yup from 'yup';

const ModeloValidator = Yup.object().shape({
    nome: Yup.string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

    data: Yup.date()
    .required('A data de nascimento é obrigatória'),

    altura: Yup.number()
    .required('A altura é obrigatória')
    .positive('A altura deve ser positiva')
    .integer('A altura deve ser um número inteiro'),

    telefone: Yup.string()
    .required('O telefone é obrigatório')
    .matches(/\(\d{2}\) \d{5}-\d{4}/, 'O telefone deve estar no formato (99) 99999-9999'),

    email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório'),

    pecas: Yup.string()
    .required('A peça de roupa é obrigatória'),

    foto: Yup.string()
    .url('O URL da foto deve ser válido')
    .required('A foto é obrigatória')
});

export default ModeloValidator;
