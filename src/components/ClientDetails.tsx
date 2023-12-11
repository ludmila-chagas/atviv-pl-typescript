import { useNavigate, useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: cliente, error, isPending } = useFetch('http://localhost:32831/cliente/' + id);

  const handleClick = () => {
    fetch('http://localhost:32831/cliente/excluir', {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    }).then(() => {
      navigate('/');
    })
  }

  return (
    <div className="detalhes-cliente">
      {isPending && <div>Carregando...</div>}
      {error && <div>{error}</div>}
      {cliente && (
        <article className="detalhes-cliente-article">
          <h2>{cliente.nome}</h2> 
          <p className="detalhes-cliente-article-informacao">Nome Social: <span className="detalhes-cliente-article-descricao">{cliente.nomeSocial}</span></p>
          <p className="detalhes-cliente-article-informacao">Telefone: <span className="detalhes-cliente-article-descricao">{cliente.telefones[0].ddd} {cliente.telefones[0].numero}</span></p>
          <p className="detalhes-cliente-article-informacao">Email: <span className="detalhes-cliente-article-descricao">{cliente.email || "Não fornecido"}</span></p>
          <p className="detalhes-cliente-article-informacao">Endereço: <span className="detalhes-cliente-article-descricao">{cliente.endereco.rua}, {cliente.endereco.numero}, {cliente.endereco.bairro} </span></p>
          <p className="detalhes-cliente-article-informacao">CEP: <span className="detalhes-cliente-article-descricao">{cliente.endereco.codigoPostal}</span></p>
          <p className="detalhes-cliente-article-informacao">Descrição: <span className="detalhes-cliente-article-descricao">{cliente.endereco.informacoesAdicionais}</span></p>
          <Link to={`/cliente/atualizar/${cliente.id}`}>
            <button style={{ margin: '0px 10px 0px 0px' }}><span className="btn-label">Editar</span></button>
          </Link>
          <button onClick={handleClick}><span className="btn-label">Excluir</span></button>
        </article>
      )}
    </div>
  );
};

export default ClientDetails;