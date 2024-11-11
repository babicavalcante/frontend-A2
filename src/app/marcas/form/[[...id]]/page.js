'use client'


import Pagina from "@/app/components/Pagina/Pagina";
import MarcaValidator from "@/app/validators/MarcaValidator";
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
    const params = useParams(); // Obtém o id da marca pela URL

    const [marca, setMarca] = useState({ nome: '', fundador: '', ano_fundacao: '', pais_origem: '', logo: '' });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const marcas = JSON.parse(localStorage.getItem('marcas')) || [];
            const dados = marcas.find(item => item.id == params.id); // Procura pela marca com o id correspondente
            setMarca(dados || { nome: '', fundador: '', ano_fundacao: '', pais_origem: '', logo: '' });
        }
    }, [params.id]); // Recarrega os dados toda vez que o id mudar

    // Função para salvar as alterações feitas na marca
    function salvar(dados) {
        const marcas = JSON.parse(localStorage.getItem('marcas')) || [];

        if (marca.id) {
            // Atualiza o item na posição correta sem alterar a ordem
            const index = marcas.findIndex(item => item.id === marca.id);
            if (index !== -1) {
                marcas[index] = { ...marcas[index], ...dados };
            }
        } else {
            dados.id = v4(); // Se for uma nova marca, cria um id
            marcas.push(dados);
        }

        localStorage.setItem('marcas', JSON.stringify(marcas));
        return route.push('/marcas'); // Redireciona para a página de marcas após salvar
    }

    return (
        <Pagina titulo="Marcas">

            <Formik
                initialValues={marca} // Passa os dados da marca para o Formik
                validationSchema={MarcaValidator}
                enableReinitialize // Permite que os valores sejam atualizados sempre que o estado mudar
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
                        setFieldValue('ano_fundacao', mask(values.ano_fundacao, '9999'));
                    }, [values.ano_fundacao]);

                    return (
                        <Form className="p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa' }}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
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

                            <Form.Group className="mb-3" controlId="fundador">
                                <Form.Label>Fundador</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fundador"
                                    value={values.fundador}
                                    onChange={handleChange}
                                    isInvalid={errors.fundador}
                                    style={{ borderColor: errors.fundador ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.fundador}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="ano_fundacao">
                                <Form.Label>Ano de Fundação</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ano_fundacao"
                                    value={values.ano_fundacao}
                                    onChange={(value) => {
                                        setFieldValue('ano_fundacao', mask(value.target.value, '9999'))
                                    }}
                                    isInvalid={errors.ano_fundacao}
                                    style={{ borderColor: errors.ano_fundacao ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.ano_fundacao}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="pais_origem">
                                <Form.Label>País de Origem</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pais_origem"
                                    value={values.pais_origem}
                                    onChange={handleChange}
                                    isInvalid={errors.pais_origem}
                                    style={{ borderColor: errors.pais_origem ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.pais_origem}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="logo">
                                <Form.Label>Logo (URL)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="logo"
                                    value={values.logo}
                                    onChange={handleChange}
                                    isInvalid={errors.logo}
                                    style={{ borderColor: errors.logo ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.logo}</div>
                            </Form.Group>

                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="primary" className="me-2">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/marcas"
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