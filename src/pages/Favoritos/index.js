import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favoritos.css'

function Favoritos () {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = sessionStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme (id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id) //devolve todos os filmes menos o que clicou em excluir
        })

        setFilmes(filtroFilmes)
        sessionStorage.setItem("@primeFlix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso.")
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
            <ul>
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;