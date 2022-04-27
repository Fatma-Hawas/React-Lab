import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {addFavorite} from "../store/actions/favorite";
import {LanguageContext} from "../context/languageContext";

export default function MoviesList(){

    const{contextLanguage, setContextLanguage} = useContext(LanguageContext);

    const [movies, setMovies] = useState([ ]);

    useEffect(()=>{
        if(contextLanguage==="Ar"){
            axios.get("https://api.themoviedb.org/3/movie/popular?api_key=9aa5857c14df70e5b045be69363c1d95&language=ar")
            .then((res) => {
                setMovies(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            })
        }else if(contextLanguage==="Eng"){
            axios.get("https://api.themoviedb.org/3/movie/popular?api_key=9aa5857c14df70e5b045be69363c1d95")
            .then((res) => {
                setMovies(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [contextLanguage]);

    const [search, setSearch] = useState("");

    const fav = useSelector((state)=> state.favorite.favorite);
    const dispatch = useDispatch();

    const [favoriteIcons, setFavoriteIcons] = useState([]);
    const changeFavoriteIcon = (id) => {
        if(favoriteIcons.includes(id)){
            const newFavListIcon = favoriteIcons.filter((favId)=>favId !== id);
            setFavoriteIcons(newFavListIcon);
            console.log(favoriteIcons);
        }
        else{
            const newFavListIcon = [...favoriteIcons, id];
            setFavoriteIcons(newFavListIcon);
        }
    };

    const [favorites, setFavorites] = useState([]);
    const addFavoriteMovie = (mov) =>{
        if(favorites.includes(mov)){
            removeFavoriteMovie(mov);
        }
        else{
            const newFavList = [...favorites, mov];
            setFavorites(newFavList);
            dispatch(addFavorite(fav + 1));
            changeFavoriteIcon(mov.id);
        }
    }
    const removeFavoriteMovie = (mov) =>{
        const newFavList = favorites.filter((fav)=>fav.id !== mov.id);
        setFavorites(newFavList);
        dispatch(addFavorite(fav - 1));
        changeFavoriteIcon(mov.id);
    }

    return <>
    <div className="container bg-dark">
        <form className="mx-5 mb-5">
            <input className="form-control col mx-2" onChange={(e)=>{setSearch(e.target.value);}} type="search" placeholder="Search..."/>
        </form>
        <div className="row row-cols-4">
            {movies.filter((movie)=>{if(search===""){return movie;}else if(movie.title.includes(search)){
                return movie;}}).map((movie) => {
                return(
                    <>
                    <div className="col">
                        <div className="card mb-5 bg-dark text-white" style={{width:"20rem"},{height:"35rem"}}>
                            <Link to={`/movieDetails/${movie.id}`}><img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="f"/></Link>
                            <i className={`bi bi-heart${favoriteIcons.includes(movie.id) ? "-fill text-danger" : ""} h1`} onClick={()=>addFavoriteMovie(movie)}/>
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5><br/>
                            </div>
                        </div>
                    </div>
                    </>
                )
            })}
        </div>
        <h1 className="text-white" id="h1">Favorites</h1>
        <div className="row row-cols-4">
            {favorites.map((movie) => {
                return(
                    <>
                    <div key={movie.id} className="col">
                        <div className="card mb-5 bg-dark text-white" style={{width:"20rem"},{height:"35rem"}}>
                            <Link to={`/movieDetails/${movie.id}`}><img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="f"/></Link>
                            <i className="fa-solid fa-xmark h1 text-black" onClick={()=>removeFavoriteMovie(movie)}></i>
                            <div className="card-body">
                                <h5 className="card-title">{movie.original_title}</h5><br/>
                            </div>
                        </div>
                    </div>
                    </>
                )
            })}
        </div>
    </div>
    </>
}