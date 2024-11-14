import * as Yup from 'yup';

const MarcaValidator = Yup.object().shape({
    nome: Yup.string()
        .required('Nome é obrigatório')
        .min(3, 'Nome deve ter pelo menos 3 caracteres'),
    fundador: Yup.string()
        .required('Fundador é obrigatório')
        .min(3, 'Fundador deve ter pelo menos 3 caracteres'),
    ano_fundacao: Yup.string()
        .required('Ano de Fundação é obrigatório'),
    pais_origem: Yup.string()
        .required('País de Origem é obrigatório'),
    logo: Yup.mixed()
        .required('Logo é obrigatório'),
    descricao: Yup.string()
    .required('A descrição é obrigatória.')
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.')
    .max(500, 'A descrição não pode ter mais de 500 caracteres.'),
});

export default MarcaValidator;
