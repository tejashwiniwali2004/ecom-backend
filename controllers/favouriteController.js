const Favourite = require("../models/Favourites");
const Product = require("../models/Product");

const addToFavourite = async(req,res)=>{
    try{
        const { productId }=req.body;

        const product = await Product.findById(productId);

        
    if(!product){
            return res.status(404).json({
                message:"Product not found",
            });
    }

    const existingItem = await Favourite.findOne({
        product:product._id,
        user:req.user.userId,
    });

    if(existingItem){
        return res.status(400).json({
            message:"Product alredly available in Favourite",
        });
    }
        await Favourite.create({
           product:product._id,
           user:req.user.userId,
           quantity:1,
    });
    
    res.status(200).json({
        message:"Product added to Favourites sucessfully",
    });
    } catch(error){
            console.log("Error is creating user",error.message);
            res.status(500).json({
                message:"Iternal server error",
            }); 
    }          
};
const getFavourites = async(req,res)=>{
    try{
        const Favourites = await Favourite.find({ user: req.user.userId }).populate(
            "product"
        );

        res.status(200).json(favourites);
    } catch(error){
            console.log("Error: ",error.message);
            res.status(500).json({
                message:"Iternal server error",
            }); 
    }
};


const removeFavourite=async(req,res)=>{
    try{
        const {id}=req.params;

         const item = await CartItem.findByIdAndDelete(id);
         if(!item){
            return res.status(404).json({
                message:"Product not found in Favourites",
            });
         }

         res.status(200).json({
            message:"product removed from Favourites",
         });
    }catch(error){
            console.log("Error: ",error.message);
            res.status(500).json({
                message:"Iternal server error",
            });
        }
};            
module.exports={ addToFavourite,getFavourites,removeFavourite};