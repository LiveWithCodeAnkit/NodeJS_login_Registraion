const jwt = require('jsonwebtoken');
const StudentRegis = require('../model/registers');


const auth = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        const veriFyU = jwt.verify(token, "abcmdcashfhsjfsdfsdfnfmgnfmgnfff");
        // console.log("auth enaul", register.email);
        console.log("verfy...", veriFyU)
        next();
    } catch (error) {
        console.log("authcall");
        // console.log("auth enaul", StudentRegis.email);
        res.status(401).send(error);
    }
}

module.exports = auth;
