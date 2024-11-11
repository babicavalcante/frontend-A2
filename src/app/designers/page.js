'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa"; 
import { MdDelete } from "react-icons/md"; 
import Pagina from "../components/Pagina/Pagina";

export default function Page() {
    
    const [designers, setDesigners] = useState([]);

    useEffect(() => {
        setDesigners(JSON.parse(localStorage.getItem('designers')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = designers.filter(item => item.id !== id);
            localStorage.setItem('designers', JSON.stringify(dados));
            setDesigners(dados);
        }
    }

    return (
        <Pagina titulo="Designers">
            <Link
                href="/designers/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome Completo</th>
                        <th>Especialidade</th>
                        <th>Email</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {designers.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/designers/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.especialidade}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}