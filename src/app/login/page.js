'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha"; // Importando o reCAPTCHA
import './login.css';  

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Estado para o email
  const [password, setPassword] = useState(""); // Estado para a senha
  const [recaptchaValue, setRecaptchaValue] = useState(null); // Estado para armazenar a resposta do reCAPTCHA
  const [error, setError] = useState(null); // Estado para mensagens de erro
  const router = useRouter();

  // Função de login
  const handleLogin = (e) => {
    e.preventDefault();

    // Verificando se o reCAPTCHA foi preenchido
    if (!recaptchaValue) {
      setError("Por favor, complete o reCAPTCHA.");
      return;
    }

    // Recupera as credenciais salvas no localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Verifica se as credenciais do usuário estão corretas
    if (storedUser && email === storedUser.email && password === storedUser.password) {
      // Se as credenciais forem válidas, redireciona para a página principal
      router.push("/fashionb");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o email
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza a senha
              required
            />
          </Form.Group>

          {/* reCAPTCHA */}
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6Lfujn0qAAAAAGNJ6rzoTXX7ZNYbMD9aYBvDsvLT" // Substitua pela sua chave pública do reCAPTCHA
              onChange={(value) => setRecaptchaValue(value)} // Armazena o valor do reCAPTCHA
            />
          </div>

          {/* Exibe a mensagem de erro se houver */}
          {error && <p className="error-message">{error}</p>}

          <Button variant="primary" type="submit" className="w-100 mt-3">
            <FaSignInAlt /> Entrar
          </Button>
        </Form>

        {/* Lembrete de cadastro e link para "Esqueceu sua senha?" */}
        <div className="text-center mt-3">
          <p className="login-info">
            Não tem uma conta? <Link href="/conta" className="text-muted">Cadastre-se</Link>
          </p>
          <p className="forgot-password">
            <Link href="/esqueci-senha" className="text-muted">Esqueceu sua senha?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
