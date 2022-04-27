import { useState } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import {LanguageContext} from "./context/languageContext";

function App() {

  const [contextLanguage, setContextLanguage] = useState("Eng");

  return (
    <>
    <div className="bg-dark" dir={contextLanguage === "Ar"?"rtl":"ltr"}>
    <BrowserRouter>
    <LanguageContext.Provider value={{contextLanguage, setContextLanguage}}>
      <Navbar/>
      <div className="page">
        <Switch>
          <Route path="/" exact component={MoviesList}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/movieDetails/:id" exact component={MovieDetails}/>
          <Route path="/favorites" exact component={Favorites}/>
          <Route path={"*"} exact component={NotFound}/>
        </Switch>
      </div>
    </LanguageContext.Provider>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
