'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina/Pagina";
import './modelos.css'; // Importando o CSS (você pode ajustar ou criar o CSS conforme necessário)

export default function Page() {
    const [modelos, setModelos] = useState([]);

    // Carrega os modelos do localStorage quando a página é carregada
    useEffect(() => {
        setModelos(JSON.parse(localStorage.getItem('modelos')) || []);
    }, []);

    // Função para excluir um modelo
    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            // Filtra os modelos para remover o que foi excluído
            const dadosAtualizados = modelos.filter(item => item.id !== id);
            // Atualiza o localStorage com os dados atualizados
            localStorage.setItem('modelos', JSON.stringify(dadosAtualizados));
            // Atualiza o estado para refletir a exclusão
            setModelos(dadosAtualizados);
        }
    }

    return (
        <Pagina titulo="Modelos">
            <div className="page-container">
                {/* Botão para adicionar novo modelo */}
                <Link href="/modelos/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo Modelo
                </Link>

                {/* Exibição dos modelos cadastrados */}
                <div className="card-container">
                    {modelos.length === 0 ? (
                        <p>Nenhum modelo cadastrado.</p>
                    ) : (
                        modelos.map((item) => (
                            <div key={item.id} className="card">
                                {/* Exibe a foto do modelo */}
                                <img src={item.foto} alt={`${item.nome} foto`} className="card-img" />
                                <h3>{item.nome}</h3>
                                <p><strong>Altura:</strong> {item.altura} cm</p>
                                <p><strong>Idade:</strong> {item.idade} anos</p>
                                <p><strong>Telefone:</strong> {item.telefone}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Peça de Roupa:</strong> {item.peca}</p>
                                <p><strong>Desfile:</strong> {item.desfile}</p>

                                {/* Ações de editar e excluir */}
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
