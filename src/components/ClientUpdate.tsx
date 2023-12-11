import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ClientUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: cliente, error, isPending } = useFetch('http://localhost:32831/cliente/' + id);

    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ddd, setDDD] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [informacoesAdicionais, setInformacoesAdicionais] = useState('');

    const estadosBrasileiros = [
        "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
        "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais",
        "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte",
        "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
    ];

    useEffect(() => {
        if (cliente) {
            setNome(cliente.nome || '');
            setNomeSocial(cliente.nomeSocial || '');
            setTelefone(cliente.telefones[0].numero || '');
            setDDD(cliente.telefones[0].ddd || '');
            setEmail(cliente.email || '');
            setEstado(cliente.endereco.estado || '');
            setCidade(cliente.endereco.cidade || '');
            setRua(cliente.endereco.rua || '');
            setNumero(cliente.endereco.numero || '');
            setBairro(cliente.endereco.bairro || '');
            setCodigoPostal(cliente.endereco.codigoPostal || '');
            setInformacoesAdicionais(cliente.endereco.informacoesAdicionais || '');
        }
    }, [cliente]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const endereco = {
            estado,
            cidade,
            bairro,
            rua,
            numero,
            codigoPostal,
            informacoesAdicionais,
        };

        const clienteAtualizado = {
            id,
            nome,
            nomeSocial,
            email,
            endereco,
            telefones: [
                {
                    numero: telefone,
                    ddd,
                },
            ],
        };

        fetch('http://localhost:32831/cliente/atualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteAtualizado),
        })
            .then((response) => {
                console.log(clienteAtualizado)
                if (!response.ok) {
                    throw new Error('Erro ao atualizar cliente');
                }
                console.log('Cliente atualizado com sucesso');

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(() => {
                navigate(`/cliente/${id}`);
            })
            .catch((error) => {
                console.error('Erro durante a atualização:', error);
            });
    };

    return (
        <div className="create">
            <h2>Editar Cliente</h2>
            {isPending && <div>Carregando...</div>}
            {error && <div>{error}</div>}
            {cliente && (
                <form onSubmit={handleSubmit}>
                    <label className="form-label">Nome:</label>
                    <input
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <label className="form-label">Nome Social:</label>
                    <input
                        type="text"
                        required
                        value={nomeSocial}
                        onChange={(e) => setNomeSocial(e.target.value)}
                    />

                    <label className="form-label">Telefone:</label>
                    <div className="telefone">
                        <input
                            type="text"
                            value={ddd}
                            onChange={(e) => setDDD(e.target.value)}
                            style={{ width: '50px', margin: '0px 10px 0px 0px' }}
                        />

                        <input
                            type="text"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>

                    <label className="form-label">Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="form-label">Estado:</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="">Selecione um estado</option>
                        {estadosBrasileiros.map((estado, index) => (
                            <option key={index} value={estado}>
                                {estado}
                            </option>
                        ))}
                    </select>

                    <label className="form-label">Cidade:</label>
                    <input
                        type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                    />

                    <label className="form-label">Rua:</label>
                    <input
                        type="text"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                    />

                    <label className="form-label">Número:</label>
                    <input
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />

                    <label className="form-label">Bairro:</label>
                    <input
                        type="text"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                    />

                    <label className="form-label">CEP:</label>
                    <input
                        type="text"
                        value={codigoPostal}
                        onChange={(e) => setCodigoPostal(e.target.value)}
                    />

                    <label className="form-label">Informações Adicionais:</label>
                    <textarea
                        value={informacoesAdicionais}
                        onChange={(e) => setInformacoesAdicionais(e.target.value)}
                        className="informacoes-adicionais-textarea"
                    ></textarea>

                    <button type="submit" className="btn-label">Salvar Alterações</button>
                </form>
            )}
        </div>
    );
};

export default ClientUpdate;
