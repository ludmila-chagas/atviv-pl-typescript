import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="not-found">
          <h2>Desculpe</h2>
          <p>A página que você procura não foi encontrada</p>
          <Link to="/">Voltar para a página inicial...</Link>
        </div>
      );
    };
 
export default PageNotFound;