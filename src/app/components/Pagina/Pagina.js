'use client'

import { Container, Nav, NavDropdown, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import './Pagina.css'; // Certifique-se de que seu CSS está sendo carregado corretamente.
import Footer from "../Footer/Footer";


export default function Pagina(props) {
    return (
        <>
            <Navbar expand="lg" className="navbar-custom">
                <Container>
                    {/* Logo FashionB com link direto */}
                    <Navbar.Brand href="/fashionb" className="navbar-logo">
                        FashionB
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/designers">Designers</NavDropdown.Item>
                                <NavDropdown.Item href="/marcas">Marcas</NavDropdown.Item>
                                <NavDropdown.Item href="/pecas">Peças de Roupa</NavDropdown.Item>
                                <NavDropdown.Item href="/modelos">Modelos</NavDropdown.Item>
                                <NavDropdown.Item href="/desfiles">Desfiles de Moda</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        {/* Barra de Pesquisa */}
                        <Form className="d-flex search-form">
                            <FormControl
                                type="search"
                                placeholder="Buscar produtos"
                                className="me-2 search-input"
                                aria-label="Search"
                            />
                            <Button variant="outline-light" className="search-button">
                                <FaSearch />
                            </Button>
                        </Form>

                        {/* Ícones de Navegação (Login, Carrinho, Favoritos) */}
                        <Nav>
                            <Nav.Link href="/login">
                                <FaUser className="nav-icon" />
                            </Nav.Link>
                            <Nav.Link href="/cart">
                                <FaShoppingCart className="nav-icon" />
                            </Nav.Link>
                            <Nav.Link href="/favorites">
                                <FaHeart className="nav-icon" />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Cabeçalho com título */}
            <div className="page-header">
                <h1>{props.titulo}</h1>
            </div>

            {/* Container para conteúdo principal */}
            <Container className="content-container">
                {props.children}
            </Container>

            {/* Incluindo o Footer ao final da página */}
            <Footer />
        </>
    );
}
