'use client'


import Pagina from "@/app/components/Pagina/Pagina";
import ModeloValidator from "@/app/validators/ModeloValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page() {
    const route = useRouter();
    const params = useParams(); // Descompacta params usando useParams()

    const [modelo, setModelo] = useState({
        nome: '', 
        data: '', 
        altura: '', 
        telefone: '', 
        email: '', 
        peca: '', 
        foto: ''
    });

    const [pecas, setPecas] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const modelos = JSON.parse(localStorage.getItem('modelos')) || [];
            const dados = modelos.find(item => item.id == params.id);
            setModelo(dados || { nome: '', data: '', altura: '', telefone: '', email: '', peca: '', foto: '' });
            setPecas(JSON.parse(localStorage.getItem('pecas')) || []);
        }
    }, [params.id]);

    // Função para salvar as alterações feitas no modelo
    function salvar(dados) {
        const modelos = JSON.parse(localStorage.getItem('modelos')) || [];

        if (modelo.id) {
            // Encontrando o índice do modelo para atualizar
            const index = modelos.findIndex(item => item.id === modelo.id);
            if (index !== -1) {
                modelos[index] = { ...modelos[index], ...dados }; // Atualiza o modelo no array
            }
        } else {
            dados.id = v4(); // Se for novo modelo, gera um ID
            modelos.push(dados);
        }

        localStorage.setItem('modelos', JSON.stringify(modelos));
        return route.push('/modelos'); // Redireciona para a página de modelos após salvar
    }

    return (
        <Pagina titulo="Modelos">

            <Formik
                initialValues={modelo}
                enableReinitialize
                validationSchema={ModeloValidator}
                onSubmit={values => salvar(values)} // Chama a função de salvar
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
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={errors.nome}
                                    style={{ borderColor: errors.nome ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="data">
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="data"
                                    value={values.data}
                                    onChange={handleChange}
                                    isInvalid={errors.data}
                                    style={{ borderColor: errors.data ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.data}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="altura">
                                <Form.Label>Altura</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="altura"
                                    value={values.altura}
                                    onChange={handleChange}
                                    isInvalid={errors.altura}
                                    style={{ borderColor: errors.altura ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.altura}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(value) => {
                                        setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999'))
                                    }}
                                    isInvalid={errors.telefone}
                                    style={{ borderColor: errors.telefone ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.telefone}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={errors.email}
                                    style={{ borderColor: errors.email ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.email}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="peca">
                                <Form.Label>Peça de roupa</Form.Label>
                                <Form.Select
                                    name="peca"
                                    value={values.peca}
                                    onChange={handleChange}
                                    isInvalid={errors.peca}
                                >
                                    <option value=''>Selecione</option>
                                    {pecas.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{errors.peca}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="foto"
                                    value={values.foto}
                                    onChange={handleChange}
                                    isInvalid={errors.foto}
                                    style={{ borderColor: errors.foto ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.foto}</div>
                            </Form.Group>

                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="primary" className="me-2">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/modelos"
                                    className="btn btn-secondary"
                                >
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Pagina>
    );
}
