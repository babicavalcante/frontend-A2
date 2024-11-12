'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina/Pagina";


export default function Page() {

    const [pecas, setPecas] = useState([]);

    useEffect(() => {
        setPecas(JSON.parse(localStorage.getItem('pecas')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir a peça?')) {
            const dados = pecas.filter(item => item.id !== id);
            localStorage.setItem('pecas', JSON.stringify(dados));
            setPecas(dados);
        }
    }

    return (
        <Pagina titulo="Peças de Roupa">

            <Link
                href="/pecas/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Nova Peça
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Tamanho</th>
                        <th>Cor</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {pecas.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/pecas/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.marcas}</td>
                            <td>{item.categoria}</td>
                            <td>{item.tamanho}</td>
                            <td>{item.cor}</td>
                            <td>{`R$ ${item.preco.toFixed(2).replace('.', ',')}`}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
