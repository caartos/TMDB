import React, { useEffect } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const SingleCard = ({info, mail}) => {
    console.log("INFOOOOOOO",info)
    const navigate = useNavigate();


    const handleRemove = (event) => {
        event.preventDefault();
        axios.delete(`/api/favorite/delete/${mail}/${info.unico}`)
        .then(()=>console.log("deleted")).then(()=>navigate("/favorite"))
    }


  return (
    <div key={info.id}>
              <img
                src={info.imagenFav}
                alt=""
                height={200}
                with="100%"
                className="margen-imagen"
              />
              <h5>{info.nombreFav}</h5>
              <Button onClick={handleRemove}>REMOVE FROM FAVORITES</Button>
            </div>
  )
}

export default SingleCard