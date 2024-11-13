'use client'


import Pagina from "@/app/components/Pagina/Pagina";
import DesfileValidator from "@/app/validators/DesfileValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const desfiles = JSON.parse(localStorage.getItem('desfiles')) || []
    const dados = desfiles.find(item => item.id == params.id)
    const desfile = dados || { nome: '', marca: '', designer: '', modelo: '', horario: '', data: '' }

    const [marcas, setMarcas] = useState([]);
    const [designers, setDesigners] = useState([]);
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        setMarcas(JSON.parse(localStorage.getItem('marcas')) || []);
        setDesigners(JSON.parse(localStorage.getItem('designers')) || []);
        setModelos(JSON.parse(localStorage.getItem('modelos')) || []);
    }, []);

    function salvar(dados) {

        if (desfile.id) {
            Object.assign(desfile, dados)
        } else {
            dados.id = v4()
            desfiles.push(dados)
        }

        localStorage.setItem('desfiles', JSON.stringify(desfiles))
        return route.push('/desfiles')
    }

    return (
        <Pagina titulo="Desfiles">

            <Formik
                initialValues={desfile}
                validationSchema={DesfileValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    setFieldValue,
                }) => {

                    // Mascara para o campo de horário (exemplo: HH:MM)
                    useEffect(() => {
                        setFieldValue('horario', mask(values.horario, '99:99'));
                    }, [values.horario]);

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
                            <Form.Group className="mb-3" controlId="marca">
                                <Form.Label>Marca</Form.Label>
                                <Form.Select
                                    name="marca"
                                    value={values.marca}
                                    onChange={handleChange}
                                    isInvalid={errors.marca}
                                >
                                    <option value=''>Selecione</option>
                                    {marcas.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{errors.marca}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="designer">
                                <Form.Label>Designer</Form.Label>
                                <Form.Select
                                    name="designer"
                                    value={values.designer}
                                    onChange={handleChange}
                                    isInvalid={errors.designer}
                                >
                                    <option value=''>Selecione</option>
                                    {designers.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{errors.designer}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="modelo">
                                <Form.Label>Modelo</Form.Label>
                                <Form.Select
                                    name="modelo"
                                    value={values.modelo}
                                    onChange={handleChange}
                                    isInvalid={errors.modelo}
                                >
                                    <option value=''>Selecione</option>
                                    {modelos.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{errors.modelo}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="horario">
                                <Form.Label>Horário</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="horario"
                                    value={values.horario}
                                    onChange={(e) => setFieldValue('horario', mask(e.target.value, '99:99'))}
                                    isInvalid={errors.horario}
                                    style={{ borderColor: errors.horario ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">{errors.horario}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="data">
                                <Form.Label>Data</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="data"
                                    value={values.data}
                                    onChange={handleChange}
                                    isInvalid={errors.data}
                                />
                                <div className="text-danger">{errors.data}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="cartaz">
                                <Form.Label>Cartaz (URL)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cartaz"
                                    value={values.cartaz}
                                    onChange={handleChange}
                                    isInvalid={errors.cartaz}
                                    style={{ borderColor: errors.cartaz ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.cartaz}</div>
                            </Form.Group> 

                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link 
                                    href="/desfiles" 
                                    className="btn btn-secondary"
                                >
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