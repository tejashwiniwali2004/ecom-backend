const jwt=require("jsonwebtoken");
const protect = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                message:"Access denied",
            });
    }
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);

    req.user=decodedData;
    next();

      } catch(error){
        console.log("Error:", error.message);
        res.status(500).json({
            message:"server error",
        });
    }   
};
module.exports=protect;