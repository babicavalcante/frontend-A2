import * as Yup from 'yup';

const RoupaValidator = Yup.object().shape({
    nome: Yup.string()
        .required('Nome é obrigatório')
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(50, 'Nome deve ter no máximo 50 caracteres'),

    marcas: Yup.string()
        .required('Marca é obrigatória'),

    categoria: Yup.string()
        .required('Categoria é obrigatória'),

    cor: Yup.string()
        .required('Cor é obrigatória')
        .min(3, 'Cor deve ter no mínimo 3 caracteres'),
    descricao: Yup.string()
        .required('A descrição é obrigatória.')
        .min(10, 'A descrição deve ter pelo menos 10 caracteres.')
        .max(500, 'A descrição não pode ter mais de 500 caracteres.'),
    preco: Yup.number()
        .required('Preço é obrigatório')
        .positive('O preço deve ser um valor positivo')
        .typeError('Preço deve ser um número válido')
});

export default RoupaValidator;
