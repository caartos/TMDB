import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const Favorites = ({ mail }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if(mail)
    axios.get(`/api/favorite/${mail}`).then(userFavs=>{
      setFavorites(userFavs.data);
    })
  }, [mail, favorites]);


  return (
    <>
      <div>Favorites</div>
      <div className="imagenes-alineadas">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <SingleCard info={fav} mail={mail} />
          ))
        ) : (
          <div>Añade peliculas o programas de tv a tu lista de favoritos</div>
        )}
      </div>
    </>
  );
};

export default Favorites;
