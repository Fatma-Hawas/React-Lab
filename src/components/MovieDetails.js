import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails(){

    const params = useParams();
    const [movieDetails, setmovieDetails] = useState({});
    const [typ, setTyp] = useState([]);

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=9aa5857c14df70e5b045be69363c1d95`)
        .then((res) => {
            console.log(res.data)
            setmovieDetails(res.data)
            setTyp(res.data.genres)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    return <>
    <div style={{height:"300vh"}}>
    <div className="container text-white">
    <div className="col">
        <div className="card mb-5" style={{width:"20rem"},{height:"60rem"}}>
            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}/>
            <div className="card-body">
                <h5 className="card-title">{movieDetails.original_title}</h5>
                <p className="card-text">Genres:</p>
                {typ.map((i) => {
                    return(
                        <>
                        <li className="card-text">{i.name}</li>
                        </>
                    )})
                }<br/>
                <p className="card-text">Overview: {movieDetails.overview}</p>
            </div>
        </div>
    </div>
    </div>
    </div>
    </>
}