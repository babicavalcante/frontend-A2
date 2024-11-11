import * as Yup from 'yup';

const MarcaValidator = Yup.object().shape({
    nome: Yup.string()
        .required('Nome é obrigatório')
        .min(3, 'Nome deve ter pelo menos 3 caracteres'),
    fundador: Yup.string()
        .required('Fundador é obrigatório')
        .min(3, 'Fundador deve ter pelo menos 3 caracteres'),
    ano_fundacao: Yup.string()
        .required('Ano de Fundação é obrigatório')
        .matches(/^\d{4}$/, 'Ano de Fundação deve ter 4 dígitos'),
    pais_origem: Yup.string()
        .required('País de Origem é obrigatório')
        .min(2, 'País de Origem deve ter pelo menos 2 caracteres'),
    logo: Yup.string()
        .url('Logo deve ser uma URL válida')
        .required('Logo é obrigatório'),
});

export default MarcaValidator;