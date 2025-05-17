const express = require("express");
const protect = require("../middlewares/authMiddlewares");
const { 
    addToFavourite,
    getFavourites,
    removeFavourite,
}=require("../controllers/favouriteController");

const favouriteRoutes=express.Router();

favouriteRoutes.post("/",protect,addToFavourite);
favouriteRoutes.get("/",protect,getFavourites);
favouriteRoutes.delete("/:id",protect,removeFavourite);

module.exports=favouriteRoutes;