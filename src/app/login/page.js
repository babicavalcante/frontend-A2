'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import './login.css';  

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      setError("Por favor, complete o reCAPTCHA.");
      return;
    }

    // Simulando um processo de autenticação (Você pode integrar com uma API de login real)
    if (email === "babi@gmail.com" && password === "123456") {
      localStorage.setItem("user", JSON.stringify({ email, password }));
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* reCAPTCHA */}
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6Lfujn0qAAAAAGNJ6rzoTXX7ZNYbMD9aYBvDsvLT"
              onChange={(value) => setRecaptchaValue(value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <Button variant="primary" type="submit" className="w-100 mt-3">
            <FaSignInAlt /> Entrar
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link href="/signup" className="text-muted">
            Não tem uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
