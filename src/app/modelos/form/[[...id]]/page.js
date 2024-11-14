'use client';

import Pagina from "@/app/components/Pagina/Pagina";
import ModeloValidator from "@/app/validators/ModeloValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { mask } from "remask";
import "react-datepicker/dist/react-datepicker.css"; // Para o estilo do calendário

export default function Page() {
    const route = useRouter();
    const params = useParams();

    const [modelo, setModelo] = useState({
        nome: '', altura: '', idade: '', desfile: '', telefone: '', email: '', peca: '', foto: ''
    });
    const [pecas, setPecas] = useState([]);
    const [desfiles, setDesfiles] = useState([]);

    useEffect(() => {
        // Carrega dados do modelo se estiver editando
        if (typeof window !== 'undefined') {
            const modelos = JSON.parse(localStorage.getItem('modelos')) || [];
            const dados = modelos.find(item => item.id === params.id);
            setModelo(dados || { nome: '', altura: '', idade: '', telefone: '', email: '', peca: '', foto: '' });
        }

        // Carrega os desfiles e peças de roupa do localStorage
        setPecas(JSON.parse(localStorage.getItem('pecas')) || []);
        setDesfiles(JSON.parse(localStorage.getItem('desfiles')) || []);
    }, [params.id]);

    // Função para salvar as alterações
    function salvar(dados) {
        const modelos = JSON.parse(localStorage.getItem('modelos')) || [];

        if (modelo.id) {
            const index = modelos.findIndex(item => item.id === modelo.id);
            if (index !== -1) {
                modelos[index] = { ...modelos[index], ...dados };
            }
        } else {
            dados.id = v4(); // Gerar ID único para novo modelo
            modelos.push(dados);
        }

        localStorage.setItem('modelos', JSON.stringify(modelos));
        route.push('/modelos');
    }

    // Função para upload da foto
    const handleFotoUpload = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fotoUrl = URL.createObjectURL(file); // Cria URL temporária da imagem
                setFieldValue("foto", fotoUrl); // Salva a URL no formulário
            };
            reader.readAsDataURL(file); // Lê o arquivo como base64, se necessário
        }
    };

    return (
        <Pagina titulo="Modelos">
            <Formik
                initialValues={modelo}
                validationSchema={ModeloValidator}
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
                        setFieldValue('telefone', mask(values.telefone, '(99) 99999-9999'));
                    }, [values.telefone]);

                    return (
                        <Form className="p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa' }}>
                            {/* Campo Nome */}
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Altura */}
                            <Form.Group className="mb-3" controlId="altura">
                                <Form.Label>Altura (em cm)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="altura"
                                    value={values.altura}
                                    onChange={handleChange}
                                    isInvalid={errors.altura}
                                />
                                <Form.Control.Feedback type="invalid">{errors.altura}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Idade */}
                            <Form.Group className="mb-3" controlId="idade">
                                <Form.Label>Idade</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="idade"
                                    value={values.idade}
                                    onChange={handleChange}
                                    isInvalid={errors.idade}
                                />
                                <Form.Control.Feedback type="invalid">{errors.idade}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Seletor de Desfile */}
                            <Form.Group className="mb-3" controlId="desfile">
                                <Form.Label>Desfile</Form.Label>
                                <Form.Select
                                    name="desfile"
                                    value={values.desfile}
                                    onChange={handleChange}
                                    isInvalid={errors.desfile}
                                >
                                    <option value="">Selecione</option>
                                    {desfiles.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.desfile}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Telefone */}
                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(e) => setFieldValue('telefone', mask(e.target.value, '(99) 99999-9999'))}
                                    isInvalid={errors.telefone}
                                />
                                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo E-mail */}
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Seletor de Peça */}
                            <Form.Group className="mb-3" controlId="peca">
                                <Form.Label>Peça de Roupa</Form.Label>
                                <Form.Select
                                    name="peca"
                                    value={values.peca}
                                    onChange={handleChange}
                                    isInvalid={errors.peca}
                                >
                                    <option value="">Selecione</option>
                                    {pecas.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.peca}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Foto (Upload) */}
                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="foto"
                                    onChange={(e) => handleFotoUpload(e, setFieldValue)}
                                    isInvalid={errors.foto}
                                />
                                {values.foto && (
                                    <img
                                        src={values.foto}
                                        alt="Foto do Modelo"
                                        style={{ width: "100px", marginTop: "10px" }}
                                    />
                                )}
                                <Form.Control.Feedback type="invalid">{errors.foto}</Form.Control.Feedback>
                            </Form.Group>

                            {/* Botões */}
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="primary" className="me-2">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/modelos" className="btn btn-secondary">
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
