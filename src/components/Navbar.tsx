import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>PetLovers</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/cadastrar" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Cadastrar cliente</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;