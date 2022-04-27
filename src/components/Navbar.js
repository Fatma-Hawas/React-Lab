import {useContext} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {LanguageContext} from "../context/languageContext";

export default function Navbar(){

    const fav = useSelector((state)=> state.favorite.favorite);

    const {contextLanguage, setContextLanguage} = useContext(LanguageContext);

    return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4 justify-content-between scroll">
        <Link className="navbar-brand" to="/">Movies</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mt-3">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#h1">Favorites</a>
                </li>&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                    <i className="bi bi-heart-fill text-danger h6"/>
                    <p className="nav-link">{fav}</p>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/todo">To Do</Link>
                </li>
                <li className="nav-item">
                    <h5 className="nav-link text-white" onClick={()=>{setContextLanguage(contextLanguage === "Ar" ? "Eng" : "Ar")}}>{contextLanguage}</h5>
                </li>
            </ul>
        </div>
    </nav>
    </>
}
