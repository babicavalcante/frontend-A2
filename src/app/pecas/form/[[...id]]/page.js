'use client'

import Pagina from "@/app/components/Pagina/Pagina";
import PecaValidator from "@/app/validators/PecaValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();
    
    const pecas = JSON.parse(localStorage.getItem('pecas')) || [];
    const dados = pecas.find(item => item.id == params.id);
    const peca = dados || { nome: '', categoria: '', tamanho: '', cor: '', preco: '' };

    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        setMarcas(JSON.parse(localStorage.getItem('marcas')) || []);
    }, []);

    function salvar(dados) {
        if (peca.id) {
            Object.assign(peca, dados);
        } else {
            dados.id = v4();
            pecas.push(dados);
        }

        localStorage.setItem('pecas', JSON.stringify(pecas));
        return route.push('/pecas');
    }

    return (
        <Pagina titulo="Peças de Roupa">
            <Formik
                initialValues={peca}
                validationSchema={PecaValidator}
                onSubmit={(values, { setSubmitting }) => {
                    salvar(values);
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    setFieldValue,
                }) => {

                    return (
                        <Form className="p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa' }}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                    isInvalid={errors.nome}
                                    style={{ borderColor: errors.nome ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="marcas">
                                <Form.Label>Marcas</Form.Label>
                                <Form.Select
                                    name="marcas"
                                    value={values.marcas}
                                    onChange={handleChange('marcas')}
                                    isInvalid={errors.marcas}
                                >
                                    <option value=''>Selecione</option>
                                    {marcas.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{errors.marcas}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="categoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="categoria"
                                    value={values.categoria}
                                    onChange={handleChange('categoria')}
                                    isInvalid={errors.categoria}
                                    style={{ borderColor: errors.categoria ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.categoria}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tamanho">
                                <Form.Label>Tamanho</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tamanho"
                                    value={values.tamanho}
                                    onChange={handleChange('tamanho')}
                                    isInvalid={errors.tamanho}
                                    style={{ borderColor: errors.tamanho ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.tamanho}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="cor">
                                <Form.Label>Cor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cor"
                                    value={values.cor}
                                    onChange={handleChange('cor')}
                                    isInvalid={errors.cor}
                                    style={{ borderColor: errors.cor ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cor}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="preco">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="preco"
                                    value={values.preco ? `R$ ${values.preco.toFixed(2).replace('.', ',')}` : ''}
                                    onChange={e => {
                                        // Remove "R$" e formata para número
                                        const rawValue = e.target.value.replace(/[^\d]/g, '');
                                        const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0; // Convertendo para número
                                        setFieldValue('preco', numericValue);
                                    }}
                                    isInvalid={errors.preco}
                                />
                                <div className="text-danger">{errors.preco}</div>
                            </Form.Group>


                            <div className="text-center">
                                <Button type="submit" variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/pecas" 
                                className="btn btn-danger ms-2">
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