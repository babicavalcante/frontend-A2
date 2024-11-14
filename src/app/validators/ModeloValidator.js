import * as Yup from 'yup';

const ModeloValidator = Yup.object().shape({
    nome: Yup.string()
        .required('O nome é obrigatório.')
        .min(3, 'O nome deve ter pelo menos 3 caracteres.'),
        
    altura: Yup.number()
        .required('A altura é obrigatória.')
        .min(160, 'A altura mínima deve ser 160 cm.')
        .max(210, 'A altura máxima deve ser 210 cm.')
        .typeError('A altura deve ser um número válido.'), // Para garantir que seja um número

    idade: Yup.number()
        .required('A idade é obrigatória.')
        .min(15, 'A idade mínima deve ser 15 anos.')
        .max(45, 'A idade máxima deve ser 45 anos.')
        .typeError('A idade deve ser um número válido.'),

    telefone: Yup.string()
        .required('O telefone é obrigatório.')
        .matches(
            /\(\d{2}\) \d{5}-\d{4}/,
            'O telefone deve seguir o formato (XX) XXXXX-XXXX.'
        ),

    email: Yup.string()
        .required('O e-mail é obrigatório.')
        .email('O e-mail deve ser válido.'),

    peca: Yup.string()
        .required('A peça de roupa é obrigatória.')
        .min(3, 'A peça de roupa deve ter pelo menos 3 caracteres.'),

    foto: Yup.mixed()
        .required('A foto é obrigatória.')
});

export default ModeloValidator;
