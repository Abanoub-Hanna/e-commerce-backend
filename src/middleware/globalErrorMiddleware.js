export const globalHandleError=(err,req,res,next)=>{
    let error=err.message
    let code=err.statusCode || 500
     if(err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({status: "fail", message: `${field} already exists`});
    }
   process.env.MODE=='dev'?
    res.status(code).json({error,stack:err.stack}):
    res.status(code).json({error})
}