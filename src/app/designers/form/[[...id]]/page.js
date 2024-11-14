'use client';

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

    const [designer, setDesigner] = useState({ nome: '', especialidade: '', email: '', telefone: '', descricao: '', foto: '' });
    const [foto, setFoto] = useState(null); // Estado para armazenar a foto carregada

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const designers = JSON.parse(localStorage.getItem('designers')) || [];
            const dados = designers.find(item => item.id == params.id);
            setDesigner(dados || { nome: '', email: '', telefone: '', descricao: '', foto: '' });
            if (dados?.foto) {
                setFoto(dados.foto); // Carrega a foto existente, se houver
            }
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

    // Função para lidar com o upload da foto
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoto(reader.result); // Define a foto como a URL da imagem
                setDesigner(prevState => ({ ...prevState, foto: reader.result }));
            };
            reader.readAsDataURL(file); // Lê a imagem como URL (base64)
        }
    };

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
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={errors.email}
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
                                />
                                <div className="text-danger">{errors.telefone}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="descricao"
                                    value={values.descricao}
                                    onChange={handleChange}
                                    isInvalid={errors.descricao}
                                />
                                <div className="text-danger">{errors.descricao}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="foto"
                                    onChange={handleFotoChange}
                                    isInvalid={errors.foto}
                                />
                                <div className="text-danger">{errors.foto}</div>
                            </Form.Group>

                            {/* Se houver uma imagem carregada, exibe ela */}
                            {foto && (
                                <div className="mb-3">
                                    <img src={foto} alt="Foto do Designer" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                                </div>
                            )}

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
                    );
                }}
            </Formik>
        </Pagina>
    );
}
