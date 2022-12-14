const express = require("express");

const router = express.Router();
const { Favorite } = require("../models");
const { User } = require("../models");

router.post("/", (req, res) => {
  const { email, nombreFav, imagenFav, favId} = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      Favorite.create({ nombreFav, imagenFav, favId, unico: favId+email })
        .then((fav) => {
          fav.setAuthor(user);
          res.status(201).send(fav);
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.status(404).send("Usuario no encontrado"));
});


router.get("/:email", (req,res)=>{
  const email = req.params.email;
  User.findOne({where:{email}}).then(user=>{
    console.log(user)
    Favorite.findAll({where:{authorId:user.dataValues.id}}).then((favorite)=>{
      res.status(200).send(favorite)
    }).catch(error=> console.log(error))
   })
})

router.delete("/delete/:email/:id", (req,res)=>{
  const email = req.params.email;
  const unico = req.params.id;
  User.findOne({where:{email}}).then(()=>{
      Favorite.destroy({where: {unico}}).then(()=>{
        res.sendStatus(204)
      })
})
})

module.exports = router;
