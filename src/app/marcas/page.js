'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina/Pagina";
import './marcas.css'; // Importando o CSS

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
            <div className="page-container">
                <Link href="/marcas/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Nova Marca
                </Link>

                <div className="card-container">
                    {marcas.length === 0 ? (
                        <p>Nenhuma marca cadastrada.</p>
                    ) : (
                        marcas.map((item) => (
                            <div key={item.id} className="card">
                                <img src={item.logo} alt={`${item.nome} logo`} />
                                <h3>{item.nome}</h3>
                                <p><strong>Fundador:</strong> {item.fundador}</p>
                                <p><strong>Ano de Fundação:</strong> {item.ano_fundacao}</p>
                                <p><strong>País de Origem:</strong> {item.pais_origem}</p>

                                <div className="actions">
                                    <Link href={`/marcas/form/${item.id}`}>
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
