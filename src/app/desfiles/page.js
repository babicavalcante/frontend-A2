'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa"; 
import { MdDelete } from "react-icons/md"; 
import Pagina from "../components/Pagina/Pagina";
import './desfiles.css'; // Importando o CSS

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
            <div className="page-container">
                <Link href="/desfiles/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo Desfile
                </Link>

                <div className="card-container">
                    {desfiles.length === 0 ? (
                        <p>Nenhum desfile cadastrado.</p>
                    ) : (
                        desfiles.map((item) => (
                            <div key={item.id} className="card">
                                <img src={item.cartaz} alt={`${item.nome} cartaz`} className="card-img" />
                                <h3>{item.nome}</h3>
                                <p><strong>Marca:</strong> {item.marca}</p>
                                <p><strong>Designer:</strong> {item.designer}</p>
                                <p><strong>Horário:</strong> {item.horario}</p>
                                <p><strong>Data:</strong> {item.data}</p>
                                <p><strong>Descrição:</strong> {item.descricao}</p>

                                <div className="actions">
                                    <Link href={`/desfiles/form/${item.id}`}>
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