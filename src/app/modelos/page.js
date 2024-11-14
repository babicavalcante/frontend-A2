'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina/Pagina";
import './modelos.css'; // Importando o CSS

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
            <div className="page-container">
                <Link href="/modelos/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo Modelo
                </Link>

                <div className="card-container">
                    {modelos.length === 0 ? (
                        <p>Nenhum modelo cadastrado.</p>
                    ) : (
                        modelos.map((item) => (
                            <div key={item.id} className="card">
                                <img src={item.foto} alt={`${item.nome} foto`} className="card-img" />
                                <h3>{item.nome}</h3>
                                <p><strong>Altura:</strong> {item.altura} cm</p>
                                <p><strong>Telefone:</strong> {item.telefone}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Peça de Roupa:</strong> {item.peca}</p>

                                <div className="actions">
                                    <Link href={`/modelos/form/${item.id}`}>
                                        <FaRegEdit title="Editar" />
                                    </Link>
                                    <button
                                        onClick={() => excluir(item.id)}
                                        title="Excluir"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Pagina>
    );
}
