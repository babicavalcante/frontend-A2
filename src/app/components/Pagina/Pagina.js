'use client';

import { Container, Nav, NavDropdown, Navbar, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaGlobe, FaMoon, FaSun } from "react-icons/fa"; 
import Link from "next/link"; 
import { useState, useEffect } from "react";
import './Pagina.css'; 
import Footer from "../Footer/Footer";

export default function Pagina(props) {
    const [language, setLanguage] = useState('pt'); 
    const [isNightMode, setIsNightMode] = useState(false); // controle do modo noturno

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang); 
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        const savedMode = localStorage.getItem('isNightMode') === 'true'; // Verificar se está no modo noturno
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
        setIsNightMode(savedMode);
        if (savedMode) {
            document.body.classList.add('night-mode');
        }
    }, []);

    // Função para alternar entre modo claro e modo escuro
    const toggleNightMode = () => {
        setIsNightMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('isNightMode', newMode);
            if (newMode) {
                document.body.classList.add('night-mode');
            } else {
                document.body.classList.remove('night-mode');
            }
            return newMode;
        });
    };

    return (
        <>
            <Navbar expand="lg" className="navbar-custom">
                <Container>
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
                                placeholder="Buscar desfiles"
                                className="me-2 search-input"
                                aria-label="Search"
                            />
                            <Button variant="outline-light" className="search-button">
                                <FaSearch />
                            </Button>
                        </Form>

                        <Nav>
                            <Nav.Link as={Link} href="/login">
                                <FaUser className="nav-icon" />
                            </Nav.Link>
                            <Nav.Link href="/favoritos">
                                <FaHeart className="nav-icon" />
                            </Nav.Link>

                            {/* Idioma */}
                            <Nav.Link className="navbar-nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" id="dropdown-language" className="nav-link">
                                        <FaGlobe className="nav-icon" /> 
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleLanguageChange('pt')}>
                                            Português
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleLanguageChange('en')}>
                                            English
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleLanguageChange('es')}>
                                            Español
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Link>

                            <Nav.Link onClick={toggleNightMode} className="nav-icon">
                                {isNightMode ? <FaSun /> : <FaMoon />} 
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="page-header">
                <h1>{props.titulo}</h1>
            </div>

            <Container className="content-container">
                {props.children}
            </Container>
            
            <Footer />
        </>
    );
}
