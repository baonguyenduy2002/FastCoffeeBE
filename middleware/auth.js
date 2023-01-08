const jwt = require("jsonwebtoken");

const authEmployee = (req, res, next) => {
    const token = req.cookies.token
    const key = "K3y_F4k3_D0nt_63t_1t"

    if(!token){
        return res.json({msg:"No token found, authorization denied"})
    }

    try {
        const decoded = jwt.verify(token, key)
        req.shopid = decoded.shopid
        next()
    } catch (error) {
        console.log(error)
        res.json({msg:"Token is not valid"})
    }
}

module.exports = {
    authEmployee
}