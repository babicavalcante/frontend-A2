'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina/Pagina";


export default function Page() {

    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        setModelos(JSON.parse(localStorage.getItem('modelos')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = modelos.filter(item => item.id !== id);
            localStorage.setItem('modelos', JSON.stringify(dados));
            setModelos(dados);
        }
    }

    return (
        <Pagina titulo="Modelos">

            <Link
                href="/modelos/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Dt. Nascimento</th>
                        <th>Altura</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Peça de roupa</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {modelos.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/modelos/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.data}</td>
                            <td>{item.altura}</td>
                            <td>{item.telefone}</td>
                            <td>{item.email}</td>
                            <td>{item.peca}</td>
                            <td>
                                <img src={item.foto} alt={`${item.nome} foto`} width={100} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}