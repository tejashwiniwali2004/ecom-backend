const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
});

const Favourite = mongoose.model("Favourite",favouriteSchema);

module.exports =Favourite;