'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina/Pagina";


export default function Page() {

    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        setMarcas(JSON.parse(localStorage.getItem('marcas')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = marcas.filter(item => item.id !== id);
            localStorage.setItem('marcas', JSON.stringify(dados));
            setMarcas(dados);
        }
    }

    return (
        <Pagina titulo="Marcas">

            <Link
                href="/marcas/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Fundador</th>
                        <th>Ano de Fundação</th>
                        <th>País de Origem</th>
                        <th>Logo</th>
                    </tr>
                </thead>
                <tbody>
                    {marcas.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/marcas/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.fundador}</td>
                            <td>{item.ano_fundacao}</td>
                            <td>{item.pais_origem}</td>
                            <td>
                                <img src={item.logo} alt={`${item.nome} logo`} width={100} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}