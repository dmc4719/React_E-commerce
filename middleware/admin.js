const jwt = require('jsonwebtoken')

function auth(req,res,next){
   
    var token = req.headers['authorization'];
    console.log('in middleware')
    if (token){
        console.log(token)
        var token = token.split(" ");
        token = token[1];
        try{
            const decoded = jwt.verify(token, 'SECRET');
            var foundAdmin = {}
            Admin.findOne({_id: decoded._id,role:decoded.role})
            .then( user => foundAdmin = user )
            if(foundAdmin){
                req.admin = decoded
                next()
            }
        }
        catch(e){
            res.status(400).json({error: 'token is not valid'})
        }
    }
    else{
        res.status(400).json("error")
    }

}

module.exports = auth