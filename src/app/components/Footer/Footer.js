// components/Footer.js
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import './Footer.css'; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-links-column">
          <h3>Explore</h3>
          <ul>
            <li><Link href="/sobre">Sobre</Link></li>
            <li><Link href="/contato">Contato</Link></li>
            <li><Link href="/ajuda">Ajuda</Link></li>
            <li><Link href="/carreira">Carreiras</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-links-column">
          <h3>Políticas</h3>
          <ul>
            <li><Link href="/privacidade">Política de Privacidade</Link></li>
            <li><Link href="/termos">Termos de Uso</Link></li>
            <li><Link href="/trocas">Política de Trocas</Link></li>
          </ul>
        </div>
        <div className="footer-links-column">
          <h3>Conecte-se</h3>
          <ul>
            <li><Link href="/newsletter">Assine nossa Newsletter</Link></li>
            <li><Link href="/newsletter">Receba Ofertas Exclusivas</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-social">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 FashionB. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
