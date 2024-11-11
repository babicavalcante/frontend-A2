'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa"; 
import { MdDelete } from "react-icons/md"; 
import Pagina from "../components/Pagina/Pagina";



export default function Page() {
    
    const [desfiles, setDesfiles] = useState([]);

    useEffect(() => {
        setDesfiles(JSON.parse(localStorage.getItem('desfiles')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = desfiles.filter(item => item.id !== id);
            localStorage.setItem('desfiles', JSON.stringify(dados));
            setDesfiles(dados);
        }
    }

    return (
        <Pagina titulo="Desfiles">
            <Link
                href="/desfiles/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Designer</th>
                        <th>Modelo</th>
                        <th>Horário</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {desfiles.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/desfiles/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.marca}</td>
                            <td>{item.designer}</td>
                            <td>{item.modelo}</td>
                            <td>{item.horario}</td>
                            <td>{item.data}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}