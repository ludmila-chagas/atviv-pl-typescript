import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientRegister = () => {
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ddd, setDDD] = useState('');
    const [isPending, setIsPending] = useState(false);

    const navigate = useNavigate();

    const estadosBrasileiros = [
        "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
        "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais",
        "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte",
        "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
    ];

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

        const cliente = {
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

        setIsPending(true);

        fetch('http://localhost:32831/cliente/cadastrar', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente),
        }).then(() => {
            console.log('Novo cliente cadastrado!');
            navigate('/');
        });
    };

    return (
        <div className="create">
            <h2>Cadastrar um novo cliente</h2>
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
                {!isPending && <button><span className="btn-label">Cadastrar cliente </span></button>}
                {isPending && <button disabled><span className="btn-label">Cadastrando...</span></button>}
            </form>
        </div>
    );
}

export default ClientRegister;
