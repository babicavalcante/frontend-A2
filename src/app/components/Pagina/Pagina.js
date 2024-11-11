import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import './Pagina.css';

export default function Pagina(props) {
    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">FashionB</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/designers">
                               Designers
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/marcas">
                               Marcas
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/pecas">
                               Peças de Roupa
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/modelos">
                               Modelos
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/desfiles">
                               Desfiles de Moda
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <div className="text-center p-3" style={{ backgroundColor: '#b19cd9' }}>
                <h1 style={{ color: '#ffffff' }}>{props.titulo}</h1>
            </div>

            <Container className="my-3">
                {props.children}
            </Container>
        </>
    )
}