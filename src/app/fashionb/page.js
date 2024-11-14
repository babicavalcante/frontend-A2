'use client'

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel, Modal } from "react-bootstrap";
import { FaShoppingCart, FaMoon, FaSun } from "react-icons/fa"; // Adicionando ícones
import Link from "next/link";
import Pagina from "../components/Pagina/Pagina";
import './fashionb.css'; // Importando o arquivo de estilos

// Simulando os dados para "modelos" e "destaques"
const modelos = [
  { id: 1, nome: "Modelo 1", foto: "/img/modelo1.jpg", descricao: "Descrição do Modelo 1" },
  { id: 2, nome: "Modelo 2", foto: "/img/modelo2.jpg", descricao: "Descrição do Modelo 2" },
  { id: 3, nome: "Modelo 3", foto: "/img/modelo3.jpg", descricao: "Descrição do Modelo 3" },
];

// Lista de imagens de destaque
const destaques = [
  {
    id: 1,
    nome: "Alta Costura 2023/2024",
    foto: "https://static.stealthelook.com.br/wp-content/uploads/2023/01/alta-costura-20232024-capa-20230117193354.jpg",
  },
  {
    id: 2,
    nome: "Victoria's Secret Fashion Show 2024",
    foto: "https://www.billboard.com/wp-content/uploads/2024/10/gigi-hadid-victorias-secret-fashion-show-2024-billboard-1548.jpg?w=1024",
  },
  {
    id: 3,
    nome: "Schiaparelli Fall 2024 Couture",
    foto: "https://images.elle.com.br/2024/06/00021-schiaparelli-fall-2024-couture-credit-brand-1240x1680.webp",
  }
];

export default function FashionB() {
  const [designers, setDesigners] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [desfiles, setDesfiles] = useState([]);
  
  const [isNightMode, setIsNightMode] = useState(false); // Estado do modo noturno
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Carregar os dados de cada categoria do localStorage
  useEffect(() => {
    const dadosDesigners = JSON.parse(localStorage.getItem('designers')) || [];
    setDesigners(dadosDesigners);

    const dadosMarcas = JSON.parse(localStorage.getItem('marcas')) || [];
    setMarcas(dadosMarcas);

    const dadosPecas = JSON.parse(localStorage.getItem('pecas')) || [];
    setPecas(dadosPecas);

    const dadosDesfiles = JSON.parse(localStorage.getItem('desfiles')) || [];
    setDesfiles(dadosDesfiles);
  }, []);

  // Função para alternar entre o modo claro e escuro
  const toggleNightMode = () => {
    setIsNightMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  }, [isNightMode]);

  // Função para abrir o modal com o conteúdo
  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <Pagina titulo="FashionB - Página Inicial">
      <Container>
        {/* Botão para alternar entre o modo claro e o modo noturno */}
        <Button
          variant="outline-light"
          className="night-mode-toggle"
          onClick={toggleNightMode}
        >
          {isNightMode ? <FaSun /> : <FaMoon />} Modo {isNightMode ? "Claro" : "Escuro"}
        </Button>

        {/* Carousel de Destaques */}
        <Carousel interval={5000} fade={true}>
          {destaques.map((destaque) => (
            <Carousel.Item key={destaque.id}>
              <img
                className="d-block w-100 destaque-img"
                src={destaque.foto}
                alt={destaque.nome}
                loading="lazy" // Para melhorar a performance de carregamento
                onClick={() => openModal(destaque)} // Abre o modal ao clicar na imagem
                style={{ cursor: 'pointer' }} // Para indicar que é interativo
              />
              <Carousel.Caption className="destaque-caption">
                <h3>{destaque.nome}</h3>
                <p>{destaque.descricao}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Exibindo os Modelos */}
        <h2 className="mt-5">Modelos em Destaque</h2>
        <Row>
          {modelos.map((modelo) => (
            <Col md={4} key={modelo.id}>
              <Card>
                <Card.Img variant="top" src={modelo.foto} onClick={() => openModal(modelo)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{modelo.nome}</Card.Title>
                  <Card.Text>{modelo.descricao}</Card.Text>
                  <Link href="/modelos" passHref>
                    <Button variant="primary">Ver Mais</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo os Designers */}
        <h2 className="mt-5">Designers</h2>
        <Row>
          {designers.map((designer) => (
            <Col md={4} key={designer.id}>
              <Card>
                <Card.Img variant="top" src={designer.foto || "/img/default.jpg"} onClick={() => openModal(designer)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{designer.nome}</Card.Title>
                  <Link href="/designers" passHref>
                    <Button variant="primary">Ver Mais</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo as Marcas */}
        <h2 className="mt-5">Marcas</h2>
        <Row>
          {marcas.map((marca) => (
            <Col md={4} key={marca.id}>
              <Card>
                <Card.Img variant="top" src={marca.foto || "/img/default.jpg"} onClick={() => openModal(marca)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{marca.nome}</Card.Title>
                  <Card.Text>{marca.descricao}</Card.Text>
                  <Link href="/marcas" passHref>
                    <Button variant="primary">Ver Mais</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo as Peças */}
        <h2 className="mt-5">Peças</h2>
        <Row>
          {pecas.map((peca) => (
            <Col md={4} key={peca.id}>
              <Card>
                <Card.Img variant="top" src={peca.foto || "/img/default.jpg"} onClick={() => openModal(peca)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{peca.nome}</Card.Title>
                  <Card.Text>{peca.descricao}</Card.Text>
                  <Link href="/pecas" passHref>
                    <Button variant="primary">Ver Mais</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo os Desfiles */}
        <h2 className="mt-5">Desfiles</h2>
        <Row className="gy-4">
          {desfiles.map((desfile) => (
            <Col md={4} key={desfile.id}>
              <Card>
                <Card.Img variant="top" src={desfile.foto || "/img/default.jpg"} onClick={() => openModal(desfile)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{desfile.nome}</Card.Title>
                  <Card.Text>{desfile.descricao}</Card.Text>
                  <Link href="/desfiles" passHref>
                    <Button variant="primary">Ver Mais</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal */}
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalContent?.nome || 'Detalhes'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent?.foto && <img src={modalContent.foto} alt={modalContent.nome} className="w-100" />}
            <p>{modalContent?.descricao}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </Pagina>
  );
}
