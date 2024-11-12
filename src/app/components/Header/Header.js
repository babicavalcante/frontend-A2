'use client'

import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import './Header.css';  // Ajuste o caminho conforme necessário

export default function Header() {
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Implemente a lógica para realizar a busca
        alert(`Pesquisando por: ${search}`);
    };

    return (
        <header className="bg-white shadow-sm">
            <Navbar expand="lg" className="navbar-light">
                <Container>
                    {/* Logo */}
                    <Link href="/" passHref>
                        <Navbar.Brand>
                            <img
                                src="/logo.png" // Substitua com o caminho do seu logo
                                alt="Logo"
                                className="img-fluid"
                                style={{ maxHeight: '40px' }}
                            />
                        </Navbar.Brand>
                    </Link>

                    {/* Barra de pesquisa */}
                    <Navbar.Collapse id="navbar-nav">
                        <Form className="d-flex w-50" onSubmit={handleSearchSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Buscar produtos"
                                className="mr-2"
                                value={search}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-primary" type="submit">
                                <FaSearch />
                            </Button>
                        </Form>
                    </Navbar.Collapse>

                    {/* Menu de navegação e ícones de ação */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto d-flex align-items-center">
                            {/* Links de navegação */}
                            <Nav.Link href="/women">Mulheres</Nav.Link>
                            <Nav.Link href="/men">Homens</Nav.Link>
                            <Nav.Link href="/designers">Designers</Nav.Link>
                            <Nav.Link href="/new-arrivals">Novidades</Nav.Link>
                            <Nav.Link href="/sale">Promoções</Nav.Link>

                            {/* Ícones de ação */}
                            <Nav.Link href="/favorites" className="d-flex align-items-center">
                                <FaHeart className="mr-2" />
                                Favoritos
                            </Nav.Link>
                            <Nav.Link href="/account" className="d-flex align-items-center">
                                <FaUser className="mr-2" />
                                Conta
                            </Nav.Link>
                            <Nav.Link href="/cart" className="d-flex align-items-center">
                                <FaShoppingCart className="mr-2" />
                                Carrinho
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
