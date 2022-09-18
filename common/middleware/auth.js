const { verifyJWToken } = require("../helper/general");

class Midware {
    authentication = async (req, res, next) => {
        try {
            req.body.user = await verifyJWToken(req.headers.authorization);;
            next();
        } catch (err) {
            console.log("Auth Middleware error : : : : :", err);
            next(err)
        }
    };
}

module.exports = new Midware();