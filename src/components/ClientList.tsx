import { Link } from 'react-router-dom';

const ClientList = ({ clientes }) => {
    return (
        <div className="cliente-list">
            {clientes.map(cliente => (
                <div className="cliente-preview" key={cliente.id} >
                    <Link to={`/cliente/${cliente.id}`}>
                    <h2>{cliente.nome}</h2>
                    <p>Nome Social: {cliente.nomeSocial}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ClientList;