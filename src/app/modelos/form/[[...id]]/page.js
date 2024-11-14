'use client';

import Pagina from "@/app/components/Pagina/Pagina";
import ModeloValidator from "@/app/validators/ModeloValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importando o CSS do react-datepicker

export default function Page({ params }) {
    const route = useRouter();
    const [modelos, setModelos] = useState([]); // Adicionando estado para modelos
    const [pecas, setPecas] = useState([]);
    const [modelo, setModelo] = useState({
        nome: '',
        altura: '',
        telefone: '',
        email: '',
        peca: '',
        foto: ''
    });

    // Carregar os modelos e peças para o seletor
    useEffect(() => {
        const storedModelos = JSON.parse(localStorage.getItem('modelos')) || [];
        setModelos(storedModelos);
        setPecas(JSON.parse(localStorage.getItem('pecas')) || []);

        // Verifica se o parâmetro 'id' foi passado e carrega o modelo correspondente
        if (params.id) {
            const modeloExistente = storedModelos.find(item => item.id === params.id);
            if (modeloExistente) {
                setModelo(modeloExistente); // Carrega os dados do modelo para edição
            }
        }
    }, [params.id]); // A dependência agora garante que a página será atualizada quando 'id' mudar

    // Função para salvar ou atualizar o modelo
    function salvar(dados) {
        const updatedModelos = [...modelos];
        if (modelo.id) {
            // Atualiza o modelo existente
            const index = updatedModelos.findIndex(item => item.id === modelo.id);
            if (index !== -1) {
                updatedModelos[index] = { ...updatedModelos[index], ...dados };
            }
        } else {
            // Cria um novo modelo
            dados.id = v4(); // Gerar um ID único para o novo modelo
            updatedModelos.push(dados);
        }

        // Atualiza o estado e o localStorage
        setModelos(updatedModelos);
        localStorage.setItem('modelos', JSON.stringify(updatedModelos));

        // Aguarda 100ms antes de redirecionar (para garantir que o localStorage foi atualizado)
        setTimeout(() => route.push('/modelos'), 100);
    }

    return (
        <Pagina titulo="Modelos">
            <Formik
                enableReinitialize // Permite que o Formik atualize os valores iniciais ao carregar as informações
                initialValues={modelo}
                validationSchema={ModeloValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    setFieldValue,
                }) => {

                    // Mascara para o campo de telefone
                    useEffect(() => {
                        setFieldValue('telefone', mask(values.telefone, '(99) 99999-9999'));
                    }, [values.telefone]);

                    // Função para lidar com a escolha de arquivo de foto
                    const handleFileChange = (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setFieldValue("foto", URL.createObjectURL(file)); // Armazenando a URL local da imagem
                        }
                    };

                    // Corrigir o formato da data (ao exibir no DatePicker)
                    const formatDate = (date) => {
                        return date ? new Date(date) : null; // Convertendo para objeto Date
                    };

                    // Formatar a data antes de salvar
                    const handleSave = (values) => {
                        const formattedValues = { ...values, data: values.data.toISOString() };
                        salvar(formattedValues);
                    };

                    return (
                        <Form className="p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa' }} onSubmit={handleSubmit}>
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

                            <Form.Group className="mb-3" controlId="altura">
                                <Form.Label>Altura (em cm)</Form.Label>
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
                                    onChange={(e) => setFieldValue('telefone', mask(e.target.value, '(99) 99999-9999'))}
                                    isInvalid={errors.telefone}
                                    style={{ borderColor: errors.telefone ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
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
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>

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

                            {/* Foto (Upload de arquivo) */}
                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    isInvalid={errors.foto}
                                    style={{ borderColor: errors.foto ? '#dc3545' : '#ced4da' }}
                                />
                                {values.foto && (
                                    <img
                                        src={values.foto}
                                        alt="Pré-visualização"
                                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <Form.Control.Feedback type="invalid">{errors.foto}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="text-center">
                                <Button type="submit" variant="primary" className="me-2">
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
