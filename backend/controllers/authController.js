const { BadRequestError } = require("../errors");


const register = async(req ,res)=>{
    const {name , email , password , c_password} = req.body;

    if(!name){
        throw new BadRequestError("Bad request")
    }

    res.send("hello world")
}


module.exports = {register}