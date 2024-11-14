'use client';

import Pagina from "@/app/components/Pagina/Pagina";
import RoupaValidator from "@/app/validators/RoupaValidator"; // Importa o validador de roupas
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
    const params = useParams(); // Obtém o id da peça pela URL

    const [peca, setPeca] = useState({
        nome: '',
        marcas: '',
        categoria: '',
        tamanho: '',
        cor: '',
        preco: '',
        foto: ''
    });
    const [marcas, setMarcas] = useState([]); // Estado para armazenar as marcas

    // Lista de categorias, agora com a categoria "Bolsa"
    const categorias = ["Roupas", "Sapatos", "Acessórios", "Bolsa"];
    
    // Tamanhos de roupas e numeração de sapato
    const tamanhosRoupas = ["PP", "P", "M", "G", "GG"];
    const numeracaoSapatos = ["33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43"];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pecas = JSON.parse(localStorage.getItem('pecas')) || [];
            const dados = pecas.find(item => item.id == params.id); // Procura pela peça com o id correspondente
            setPeca(dados || { nome: '', marcas: '', categoria: '', tamanho: '', cor: '', preco: '', foto: '' });

            const marcas = JSON.parse(localStorage.getItem('marcas')) || []; // Carrega as marcas do localStorage
            setMarcas(marcas);
        }
    }, [params.id]);

    // Função para salvar as alterações feitas na peça
    function salvar(dados) {
        const pecas = JSON.parse(localStorage.getItem('pecas')) || [];

        if (peca.id) {
            // Atualiza o item na posição correta sem alterar a ordem
            const index = pecas.findIndex(item => item.id === peca.id);
            if (index !== -1) {
                pecas[index] = { ...pecas[index], ...dados };
            }
        } else {
            dados.id = v4(); // Se for uma nova peça, cria um id
            pecas.push(dados);
        }

        localStorage.setItem('pecas', JSON.stringify(pecas));
        return route.push('/pecas'); // Redireciona para a página de peças após salvar
    }

    // Função para formatar o preço
    const formatarPreco = (preco) => {
        return preco
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") // Adiciona pontos a cada 3 dígitos
            .replace(",", "."); // Garante a vírgula como separador de decimal
    };

    // Função para tratar o upload da foto
    const handleFileChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Armazena a imagem como uma URL base64
                setFieldValue('foto', reader.result);
            };
            reader.readAsDataURL(file); // Lê o arquivo como URL base64
        }
    };

    return (
        <Pagina titulo="Peças de Roupa">

            <Formik
                initialValues={peca} // Passa os dados da peça para o Formik
                validationSchema={RoupaValidator} // Validação utilizando o schema do Yup
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

                    // Formatação do valor de preço no campo
                    useEffect(() => {
                        if (typeof values.preco === 'number') {
                            const precoNumerico = values.preco.toString();
                            setFieldValue('preco', precoNumerico ? parseFloat(precoNumerico.replace(/[^\d.-]/g, '')) : '');
                        }
                    }, [values.preco]);

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
                                    style={{ borderColor: errors.nome ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Marca */}
                            <Form.Group className="mb-3" controlId="marcas">
                                <Form.Label>Marca</Form.Label>
                                <Form.Select
                                    name="marcas"
                                    value={values.marcas}
                                    onChange={handleChange}
                                    isInvalid={errors.marcas}
                                >
                                    <option value="">Selecione</option>
                                    {marcas.map(item => (
                                        <option key={item.id} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{errors.marcas}</div>
                            </Form.Group>

                            {/* Categoria */}
                            <Form.Group className="mb-3" controlId="categoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select
                                    name="categoria"
                                    value={values.categoria}
                                    onChange={handleChange}
                                    isInvalid={errors.categoria}
                                >
                                    <option value="">Selecione</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria} value={categoria}>
                                            {categoria}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{errors.categoria}</div>
                            </Form.Group>

                            {/* Tamanho */}
                            <Form.Group className="mb-3" controlId="tamanho">
                                <Form.Label>Tamanho</Form.Label>
                                <Form.Select
                                    name="tamanho"
                                    value={values.tamanho}
                                    onChange={handleChange}
                                    isInvalid={errors.tamanho}
                                >
                                    <option value="">Selecione</option>
                                    {values.categoria === "Roupas" ?
                                        tamanhosRoupas.map((tamanho) => (
                                            <option key={tamanho} value={tamanho}>
                                                {tamanho}
                                            </option>
                                        )) :
                                        values.categoria === "Sapatos" ?
                                            numeracaoSapatos.map((numero) => (
                                                <option key={numero} value={numero}>
                                                    {numero}
                                                </option>
                                            )) : null}
                                </Form.Select>
                                <div className="text-danger">{errors.tamanho}</div>
                            </Form.Group>

                            {/* Cor */}
                            <Form.Group className="mb-3" controlId="cor">
                                <Form.Label>Cor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cor"
                                    value={values.cor}
                                    onChange={handleChange}
                                    isInvalid={errors.cor}
                                    style={{ borderColor: errors.cor ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cor}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Preço */}
                            <Form.Group className="mb-3" controlId="preco">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="preco"
                                    value={values.preco ? `R$ ${formatarPreco(values.preco)}` : 'R$ 0,00'}
                                    onChange={e => {
                                        let rawValue = e.target.value.replace(/[^\d,]/g, ''); // Remove qualquer coisa que não seja número ou vírgula
                                        // Se houver vírgula, substitua por ponto para manipulação de valores numéricos
                                        if (rawValue.includes(',')) {
                                            rawValue = rawValue.replace(',', '.');
                                        }
                                        const numericValue = rawValue ? parseFloat(rawValue) : 0;  // Garantir que seja um número, mesmo que 0
                                        setFieldValue('preco', numericValue);
                                    }}
                                    isInvalid={errors.preco}
                                />
                                <div className="text-danger">{errors.preco}</div>
                            </Form.Group>

                            {/* Foto (Upload ou URL) */}
                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto (URL ou Upload)</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setFieldValue)}
                                    isInvalid={errors.foto}
                                />
                                {values.foto && <div><img src={values.foto} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} /></div>} {/* Exibe a foto em preview */}
                                <div className="text-danger">{errors.foto}</div>
                            </Form.Group>

                            {/* Botões */}
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success" className="me-2">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/pecas" className="btn btn-danger">
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
