const CartItem = require("../models/cartitem");
const Product = require("../models/Product");

const addToCart = async(req,res)=>{
    try{
        const { productId }=req.body;

        const product = await Product.findById(productId);

        
    if(!product){
            return res.status(404).json({
                message:"Product not found",
            });
    }

    const existingItem = await CartItem.findOne({
        product:product._id,
        user:req.user.userId,
    });

    if(existingItem){
        return res.status(400).json({
            message:"Product alredly available in cart",
        });
    }
        await CartItem.create({
           product:product._id,
           user:req.user.userId,
           quantity:1,
    });
    
    res.status(200).json({
        message:"Product added to cart sucessfully",
    });
    } catch(error){
            console.log("Error is creating user",error.message);
            res.status(500).json({
                message:"Iternal server error",
            }); 
    }          
};
const getCart = async(req,res)=>{
    try{
        const cartitem = await CartItem.find({ user: req.user.userId }).populate(
            "product"
        );

        res.status(200).json({
        message:"Product added to cart sucessfully",
    });
    } catch(error){
            console.log("Error is creating user",error.message);
            res.status(500).json({
                message:"Iternal server error",
            }); 
    }
};

const updateCartItem=async(req,res)=>{
    try{
        const {id}=req.params;
        const {quantity}=req.body;

         const item = await CartItem.findByIdAndUpdate(
            id,
            {quantity},
            {new:true}
         );
         if(!item){
            return res.status(404).json({
                message:"Product not found in cart",
            });
         }
         res.status(200).json({
            message:"product quantity updated",
         });
    }catch(error){
            console.log("Error is creating user",error.message);
            res.status(500).json({
                message:"Iternal server error",
            });
        }      
};
const deleteCartItem=async(req,res)=>{
    try{
        const {id}=req.params;

         const item = await CartItem.findByIdAndDelete(id);
         if(!item){
            return res.status(404).json({
                message:"Product not found in cart",
            });
         }
         res.status(200).json({
            message:"product removed from cart",
         });
    }catch(error){
            console.log("Error is creating user",error.message);
            res.status(500).json({
                message:"Iternal server error",
            });
        }
};            
module.exports={ addToCart,getCart,updateCartItem,deleteCartItem};