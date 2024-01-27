import { useEffect, useState } from "react";
import api from '../../services/api'
import {api_key} from '../../utils/index'
import { Link } from "react-router-dom";
import './home.css'

function Home () {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes () {
            const response = await api.get("movie/now_playing", { //o await espera a requisição para passar para a linha de baixo
                params: {
                    api_key: api_key,
                    language: "pt-BR",
                    page: 1
                }
            }); 

            setFilmes(response.data.results.slice(0,10)); //apenas os 10 primeiros
            setLoading(false);
        }

        loadFilmes();
    }, [])

    if(loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}> 
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;