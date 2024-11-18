import * as Yup from 'yup';

export const ContaValidator = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  
  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/, 'A senha deve ter pelo menos uma letra maiúscula')
    .matches(/[0-9]/, 'A senha deve ter pelo menos um número')
    .matches(/[\W_]/, 'A senha deve ter pelo menos um caractere especial')
    .required('Senha é obrigatória'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
    .required('Confirme sua senha'),

  cpf: Yup.string()
    .test('valid-cpf', 'CPF inválido', (value) => {
      const cleanCPF = value.replace(/[^\d]+/g, ''); 
      return validCPF(cleanCPF); 
    })
    .required('CPF é obrigatório')
});

// validação de CPF
const validCPF = (cpf) => {
  if (!cpf || cpf.length !== 11) return false;
  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  return true;
};
