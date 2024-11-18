'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina/Pagina";
import './designers.css'; 

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
            <div className="page-container">
                <Link href="/designers/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo Designer
                </Link>

                <div className="card-container">
                    {designers.length === 0 ? (
                        <p>Nenhum designer cadastrado.</p>
                    ) : (
                        designers.map((item) => (
                            <div key={item.id} className="card">
                                <img src={item.foto} alt={`${item.nome} foto`} />
                                <h3>{item.nome}</h3>
                                <p><strong>Designer da Marca:</strong> {item.marca}</p>
                                <p><strong>Descrição:</strong> {item.descricao}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Telefone:</strong> {item.telefone}</p>

                                <div className="actions">
                                    <Link href={`/designers/form/${item.id}`}>
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
