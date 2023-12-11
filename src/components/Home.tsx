import ClientList from "./ClientList";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { error, isPending, data: clientes } = useFetch('http://localhost:32831/cliente/clientes')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { clientes && <ClientList clientes={clientes} /> }
    </div>
  );
}

export default Home;