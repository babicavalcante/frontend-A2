'use client';

import Pagina from "@/app/components/Pagina/Pagina";
import MarcaValidator from "@/app/validators/MarcaValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Para o estilo do calendário

export default function Page() {
    const route = useRouter();
    const params = useParams();

    const [marca, setMarca] = useState({
        nome: '', fundador: '', ano_fundacao: '', pais_origem: '', logo: '', descricao: ''  // Adicionando descrição
    });
    const [paisOptions, setPaisOptions] = useState([]); // Lista de países
    const [anoSelecionado, setAnoSelecionado] = useState(null);

    useEffect(() => {
        // Carrega dados da marca se estiver editando
        if (typeof window !== 'undefined') {
            const marcas = JSON.parse(localStorage.getItem('marcas')) || [];
            const dados = marcas.find(item => item.id == params.id);
            setMarca(dados || { nome: '', email: '', telefone: '', pais_origem: '', descricao: '' });  // Incluindo descrição
        }

        // Busca os países da API
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                const paises = response.data.map((pais) => ({
                    name: pais.name.common,
                    code: pais.cca2
                }));
                // Ordena os países em ordem alfabética
                paises.sort((a, b) => a.name.localeCompare(b.name));
                setPaisOptions(paises);
            })
            .catch((error) => {
                console.error("Erro ao buscar países:", error);
            });
    }, [params.id]);

    // Função para salvar as alterações
    function salvar(dados) {
        const marcas = JSON.parse(localStorage.getItem('marcas')) || [];

        if (marca.id) {
            const index = marcas.findIndex(item => item.id === marca.id);
            if (index !== -1) {
                marcas[index] = { ...marcas[index], ...dados };
            }
        } else {
            dados.id = v4();
            marcas.push(dados);
        }

        localStorage.setItem('marcas', JSON.stringify(marcas));
        route.push('/marcas');
    }

    // Função para upload do logo
    const handleLogoUpload = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Armazena a URL do arquivo no localStorage
                const logoUrl = URL.createObjectURL(file); // Gera URL temporária
                setFieldValue("logo", logoUrl); // Salva a URL no formulário
            };
            reader.readAsDataURL(file); // Lê o arquivo como base64, se necessário
        }
    };

    return (
        <Pagina titulo="Marcas">
            <Formik
                initialValues={marca}
                validationSchema={MarcaValidator}
                enableReinitialize
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    setFieldValue,
                }) => {
                    useEffect(() => {
                        // Garantir que ano_fundacao seja um número ou convertido em data válida
                        if (values.ano_fundacao) {
                            const ano = parseInt(values.ano_fundacao);
                            if (!isNaN(ano)) {
                                setAnoSelecionado(new Date(ano, 0, 1)); // Ajustando para o primeiro dia do ano
                            }
                        }
                    }, [values.ano_fundacao]);

                    return (
                        <Form className="p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa' }}>
                            {/* Campo Nome */}
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Fundador */}
                            <Form.Group className="mb-3" controlId="fundador">
                                <Form.Label>Fundador</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fundador"
                                    value={values.fundador}
                                    onChange={handleChange}
                                    isInvalid={errors.fundador}
                                />
                                <div className="text-danger">{errors.fundador}</div>
                            </Form.Group>

                            {/* Calendário para ano de fundação */}
                            <Form.Group className="mb-3" controlId="ano_fundacao">
                                <Form.Label>Ano de Fundação</Form.Label>
                                <DatePicker
                                    selected={anoSelecionado}
                                    onChange={(date) => {
                                        setAnoSelecionado(date);
                                        setFieldValue('ano_fundacao', date.getFullYear());
                                    }}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    scrollableYearDropdown
                                    showMonthDropdown={false}
                                    isInvalid={errors.ano_fundacao}
                                    className="form-control"
                                />
                                <div className="text-danger">{errors.ano_fundacao}</div>
                            </Form.Group>

                            {/* Seletor de País de Origem */}
                            <Form.Group className="mb-3" controlId="pais_origem">
                                <Form.Label>País de Origem</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="pais_origem"
                                    value={values.pais_origem}
                                    onChange={handleChange}
                                    isInvalid={errors.pais_origem}
                                >
                                    <option value="">Selecione um país</option>
                                    {paisOptions.map(pais => (
                                        <option key={pais.code} value={pais.name}>{pais.name}</option>
                                    ))}
                                </Form.Control>
                                <div className="text-danger">{errors.pais_origem}</div>
                            </Form.Group>

                            {/* Campo Descrição */}
                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="descricao"
                                    value={values.descricao}
                                    onChange={handleChange}
                                    isInvalid={errors.descricao}
                                />
                                <div className="text-danger">{errors.descricao}</div>
                            </Form.Group>

                            {/* Campo Logo (Upload) */}
                            <Form.Group className="mb-3" controlId="logo">
                                <Form.Label>Logo</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="logo"
                                    onChange={(e) => handleLogoUpload(e, setFieldValue)}
                                    isInvalid={errors.logo}
                                />
                                {values.logo && <img src={values.logo} alt="Logo" style={{ width: "100px", marginTop: "10px" }} />}
                                <div className="text-danger">{errors.logo}</div>
                            </Form.Group>

                            {/* Botões */}
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="primary" className="me-2">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/marcas" className="btn btn-secondary">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
