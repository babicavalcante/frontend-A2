'use client'

import Pagina from "@/app/components/Pagina/Pagina";
import DesignerValidator from "@/app/validators/DesignerValidator";
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

    const [designer, setDesigner] = useState({ nome: '', especialidade: '', email: '', telefone: '' });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const designers = JSON.parse(localStorage.getItem('designers')) || [];
            const dados = designers.find(item => item.id == params.id);
            setDesigner(dados || { nome: '', especialidade: '', email: '', telefone: '' });
        }
    }, [params.id]);

    // Função para salvar as alterações feitas no designer
    function salvar(dados) {
        const designers = JSON.parse(localStorage.getItem('designers')) || [];

        if (designer.id) {
            // Encontrando o índice do designer para atualizar
            const index = designers.findIndex(item => item.id === designer.id);
            if (index !== -1) {
                designers[index] = { ...designers[index], ...dados }; // Atualiza o designer no array
            }
        } else {
            dados.id = v4(); // Se for novo designer, gera um ID
            designers.push(dados);
        }

        localStorage.setItem('designers', JSON.stringify(designers));
        return route.push('/designers'); // Redireciona para a página de designers após salvar
    }

    return (
        <Pagina titulo="Designers">

            <Formik
                initialValues={designer}
                enableReinitialize
                validationSchema={DesignerValidator}
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

                            <Form.Group className="mb-3" controlId="especialidade">
                                <Form.Label>Especialidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="especialidade"
                                    value={values.especialidade}
                                    onChange={handleChange}
                                    isInvalid={errors.especialidade}
                                    style={{ borderColor: errors.especialidade ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.especialidade}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={errors.email}
                                    style={{ borderColor: errors.email ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.email}</div>
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

                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="primary" className="me-2">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/designers"
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