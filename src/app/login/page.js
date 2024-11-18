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

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
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
