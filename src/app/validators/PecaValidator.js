import * as yup from 'yup';

const PecaValidator = yup.object().shape({
    nome: yup
        .string()
        .required('Nome é obrigatório.')
        .min(2, 'Nome deve ter pelo menos 2 caracteres.')
        .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras.'),
    marcas: yup
        .string()
        .required('Marca é obrigatória.'),
    categoria: yup
        .string()
        .required('Categoria é obrigatória.')
        .min(2, 'Categoria deve ter pelo menos 2 caracteres.'),
    cor: yup
        .string()
        .required('Cor é obrigatória.')
        .min(3, 'Cor deve ter pelo menos 3 caracteres.')
        .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Cor deve conter apenas letras.'),
    preco: yup
        .number()
        .required('Preço é obrigatório.')
        .positive('Preço deve ser um número positivo.')
        .min(0.01, 'Preço deve ser maior que zero.')
});

export default PecaValidator;