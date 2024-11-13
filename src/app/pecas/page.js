'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina/Pagina";
import './pecas.css'; // Importando o CSS

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
            <div className="page-container">
                <Link href="/pecas/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Nova Peça
                </Link>

                <div className="card-container">
                    {pecas.length === 0 ? (
                        <p>Nenhuma peça cadastrada.</p>
                    ) : (
                        pecas.map((item) => (
                            <div key={item.id} className="card">
                                <img src={item.foto} alt={`${item.nome} foto`} className="card-img" />
                                <h3>{item.nome}</h3>
                                <p><strong>Marca:</strong> {item.marcas}</p>
                                <p><strong>Categoria:</strong> {item.categoria}</p>
                                <p><strong>Tamanho:</strong> {item.tamanho}</p>
                                <p><strong>Cor:</strong> {item.cor}</p>
                                <p><strong>Preço:</strong> R$ {item.preco.toFixed(2).replace('.', ',')}</p>

                                <div className="actions">
                                    <Link href={`/pecas/form/${item.id}`}>
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
