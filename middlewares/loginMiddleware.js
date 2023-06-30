import JWT from 'jsonwebtoken'

export const Isloggedin = (req,res,next) => {
    const Authheader = req.headers?.authorization
    if(Authheader){
        const token = Authheader.split(' ')[1]
        JWT.verify(token,'LOGIN123',(err,decode) => {
            if(err){
               return res.status(403).json({error:'token not found'})
            }
            req.body = decode
            next();
        })
    }
     else{
        return res.status(401).json({error:'Authentication failed'})
     }
}