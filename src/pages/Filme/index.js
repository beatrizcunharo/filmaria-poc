import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import './filme-info.css'

function Filme () {
    const { id } = useParams(); //id dinâmico que foi colocado na rota de filmes
    const navigate = useNavigate(); // 
    const [filme, setFilme] = useState({}); //redireciona pra alguma outra página
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "65a85df54d92afbbcf6d43aae92ea78f",
                    language: "pt-BR"
                }
            }).then ((response) => { //caso de sucesso
                setFilme(response.data);
                setLoading(false);
            }).catch(() => { //caso dê errado
                navigate("/", { replace: true}) //ele passa para a página como um window.location.href
            });
        }

        loadFilme();

        return () => { // desmonta o componente (componenteUnmount)
            console.log("COMPONENTE DESMONTADO")
        }
    }, [id, navigate])

    function salvarFilme () {
        const minhaLista = sessionStorage.getItem("@primeFlix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmeSalvo) => filme.id === filmeSalvo.id) //busca se tem algum filme com esse id e retorna true ou false
        
        if(hasFilme) {
            toast.warn("Esse filme já está na sua lista.")
            return ;
        }

        filmesSalvos.push(filme);
        sessionStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso.")
        
    }

    if(loading) {
        return (
            <div className="filme-info">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }
    
    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_avarage} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button> <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external">Trailer</a></button>
            </div>
        </div>
    );
}

export default Filme;