import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Header from "./components/Header";
import Erro from "./pages/Erro";
import Favoritos from "./pages/Favoritos";

function RoutesApp () {
    return (
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/filme/:id" element={<Filme/>}/> {/* Id dinâmico */}
            <Route path="/favoritos" element={<Favoritos/>}/>
            <Route path="*" element={<Erro/>}/> {/* O * renderiza página de not found e a página de erro deve ser a última rota*/}
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;