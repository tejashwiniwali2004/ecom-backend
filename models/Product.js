const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Title is required"],
            minlength:[3,"Title must be a positive number"],
        },
        price:{
            type:Number,
            required:[true,"Price is required"],
            min:[0,"Price must be a positive number"],
        },
        description:{
            type:String,
            required:[true,"description is required"],
            minlength:[10," description must be least 10 characters"],
        },
       category:{
            type:Number,
            required:[true,"categoryis required"],
            enum:["men's clothing","women's clothing","electronics", "jewelary"],
        },
        Image:{
            type:String,
            required:[true,"image URL is required"],
        },
        rating:{
         rate:{
                type:Number,
                required:[true,"Rating  is required"],
                min:[0,"Rate cannot be below 0"],
                max:[5,"Rate cannot be above 5"],
            },
            count:{
                type:Number,
                required:[true,"Rating count is required"],
                min:[0,"count cannot be nagative"],
            },
        },
    },
    { timestamps:true }
);

const Product=mongoose.model("Product",productSchema);

module.exports=Product;
