'use client'

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Carousel, Modal, Button } from "react-bootstrap";
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
    nome: "Yves Saint Laurent",
    foto: "https://s2-marieclaire.glbimg.com/U7vGrmSkta-Rl9Lnsnsh99EDeGI=/0x0:1172x659/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_51f0194726ca4cae994c33379977582d/internal_photos/bs/2024/r/z/nNggWJSe6uknsSerRemA/saint.jpg",
  },
  {
    id: 2,
    nome: "Victoria's Secret Fashion Show 2024",
    foto: "https://conteudo.imguol.com.br/c/entretenimento/16/2024/10/15/gigi-hadid-abriu-o-victorias-secret-fashion-show-2024-ao-fundo-telao-exibia-estamos-de-volta-1729037103098_v2_900x506.jpg"
  },
  {
    id: 3,
    nome: "Schiaparelli 2024 Couture",
    foto: "https://pbs.twimg.com/media/GYbjBj9b0AASGY_.jpg:large"
  }
];

export default function FashionB() {
  const [designers, setDesigners] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [desfiles, setDesfiles] = useState([]);

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
    <Pagina>
      <Container>
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
        <p>Conheça os rostos que estão dominando as passarelas e deixando sua marca no mundo da moda. Cada um com uma história única e um estilo que inspira.</p>
        <Row>
          {modelos.map((modelo) => (
            <Col md={4} key={modelo.id}>
              <Card>
                <Card.Img variant="top" src={modelo.foto} onClick={() => openModal(modelo)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{modelo.nome}</Card.Title>
                  <Card.Text>{modelo.descricao}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo os Desfiles */}
        <h2 className="mt-5">Desfiles</h2>
        <p>Prepare-se para uma experiência visual única. Os desfiles de moda mais aguardados mostram o que há de mais recente e ousado no universo fashion.</p>
        <Row className="gy-4">
          {desfiles.map((desfile) => (
            <Col md={4} key={desfile.id}>
              <Card>
                <Card.Img variant="top" src={desfile.foto || "/img/default.jpg"} onClick={() => openModal(desfile)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{desfile.nome}</Card.Title>
                  <Card.Text>{desfile.descricao}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo as Marcas */}
        <h2 className="mt-5">Marcas</h2>
        <p>Com designs que refletem inovação, qualidade e estilo, essas marcas estão na vanguarda da moda mundial.</p>
        <Row>
          {marcas.map((marca) => (
            <Col md={4} key={marca.id}>
              <Card>
                <Card.Img variant="top" src={marca.foto || "/img/default.jpg"} onClick={() => openModal(marca)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{marca.nome}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo as Peças */}
        <h2 className="mt-5">Peças</h2>
        <p>Descubra as peças mais icônicas da temporada. Roupas que combinam com qualquer estilo e ambiente, trazendo o melhor da moda para o seu guarda-roupa.</p>
        <Row>
          {pecas.map((peca) => (
            <Col md={4} key={peca.id}>
              <Card>
                <Card.Img variant="top" src={peca.foto || "/img/default.jpg"} onClick={() => openModal(peca)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{peca.nome}</Card.Title>
                  <Card.Text>{peca.descricao}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo os Designers */}
        <h2 className="mt-5">Designers</h2>
        <p>Os visionários por trás das coleções mais inovadoras da indústria da moda. Conheça os criadores que estão moldando o futuro da alta-costura.</p>
        <Row>
          {designers.map((designer) => (
            <Col md={4} key={designer.id}>
              <Card>
                <Card.Img variant="top" src={designer.foto || "/img/default.jpg"} onClick={() => openModal(designer)} style={{ cursor: 'pointer' }} />
                <Card.Body>
                  <Card.Title>{designer.nome}</Card.Title>
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

            {/* Exibir informações adicionais com base no tipo de item */}
            {modalContent?.altura && <p><strong>Altura:</strong> {modalContent.altura}</p>}
            {modalContent?.peso && <p><strong>Peso:</strong> {modalContent.peso}</p>}
            {modalContent?.idade && <p><strong>Idade:</strong> {modalContent.idade}</p>}
            {modalContent?.peça && <p><strong>Peça de Roupa:</strong> {modalContent.peça}</p>}

            {modalContent?.marca && <p><strong>Marca:</strong> {modalContent.marca}</p>}
            {modalContent?.designer && <p><strong>Designer:</strong> {modalContent.designer}</p>}
            {modalContent?.data && <p><strong>Data:</strong> {modalContent.data}</p>}
            {modalContent?.horario && <p><strong>Horário:</strong> {modalContent.horario}</p>}
            {modalContent?.descricao && <p><strong>Descrição</strong> {modalContent.descricao}</p>}

            {modalContent?.fundador && <p><strong>Fundador:</strong> {modalContent.fundador}</p>}
            {modalContent?.preco && <p><strong>Preço:</strong> {modalContent.preco}</p>}
            {modalContent?.categoria && <p><strong>Categoria:</strong> {modalContent.categoria}</p>}
            {modalContent?.cor && <p><strong>Cor:</strong> {modalContent.cor}</p>}
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
