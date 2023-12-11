import Home from './components/Home';
import ClientRegister from './components/ClientRegister';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientDetails from './components/ClientDetails';
import ClientUpdate from './components/ClientUpdate';
import PageNotFound from './components/PageNotFound';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <div className="content">
                    <Routes>
                        <Route exact path='/' element={< Home />} />
                        <Route path='/cadastrar' element={< ClientRegister />} />
                        <Route path='/cliente/:id' element={< ClientDetails />} />
                        <Route path='/cliente/atualizar/:id' element={< ClientUpdate />} />
                        <Route path="*" element={< PageNotFound />}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;