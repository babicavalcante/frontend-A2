'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { mask } from 'remask'; // Corrigindo a importação de 'remask'
import { ContaValidator } from "../validators/ContaValidator"; // Importando o validador
import './conta.css';

export default function ContaPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar a senha

  const handleConta = (values) => {
    // Salvar as informações no localStorage
    const newUser = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      telefone: values.telefone,
      cpf: values.cpf,
      password: values.password
    };

    localStorage.setItem("user", JSON.stringify(newUser)); // Salva o usuário no localStorage

    // Redirecionar para a página de login após o cadastro
    router.push("/login");
  };

  // Função para aplicar a máscara usando a função mask do remask
  const handleMask = (event, maskPattern) => {
    const { value } = event.target;
    event.target.value = mask(value, maskPattern);
  };

  return (
    <div className="conta-container">
      <div className="conta-box">
        <h2>Crie sua Conta</h2>

        <Formik
          initialValues={{
            nome: '',
            sobrenome: '',
            email: '',
            telefone: '',
            cpf: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={ContaValidator}
          onSubmit={handleConta}
        >
          {({ isSubmitting, values, handleChange }) => (
            <FormikForm>
              <div className="mb-3">
                <label>Nome</label>
                <Field
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Digite seu nome"
                />
                <ErrorMessage name="nome" component="div" className="error-message" />
              </div>

              <div className="mb-3">
                <label>Sobrenome</label>
                <Field
                  type="text"
                  name="sobrenome"
                  className="form-control"
                  placeholder="Digite seu sobrenome"
                />
                <ErrorMessage name="sobrenome" component="div" className="error-message" />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Digite seu email"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="mb-3">
                <label>Telefone</label>
                <Field
                  name="telefone"
                  className="form-control"
                  placeholder="(00) 00000-0000"
                  onInput={(e) => handleMask(e, '(99) 99999-9999')} // Máscara para o telefone
                />
                <ErrorMessage name="telefone" component="div" className="error-message" />
              </div>

              <div className="mb-3">
                <label>CPF</label>
                <Field
                  name="cpf"
                  className="form-control"
                  placeholder="000.000.000-00"
                  onInput={(e) => handleMask(e, '999.999.999-99')} // Máscara para o CPF
                  value={values.cpf}
                  onChange={(e) => {
                    handleChange(e); // Atualiza o valor de CPF no Formik
                    e.target.value = mask(e.target.value, '999.999.999-99'); // Aplica a máscara
                  }}
                />
                <ErrorMessage name="cpf" component="div" className="error-message" />
              </div>

              <div className="mb-3">
                <label>Senha</label>
                <div className="password-field">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Digite sua senha"
                  />
                  <div
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)} // Toggle para mostrar/esconder
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="mb-3">
                <label>Confirme a Senha</label>
                <div className="password-field">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirme sua senha"
                  />
                  <div
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle para mostrar/esconder
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>

              <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isSubmitting}>
                <FaUserPlus /> Criar Conta
              </Button>
            </FormikForm>
          )}
        </Formik>

        <div className="text-center mt-3">
          <Link href="/login" className="text-muted">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
