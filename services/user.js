const { ErrorHandler, handleError } = require('../common/helper/error');
const { jwtToken, hashPassword, parse, verifyPassword } = require('../common/helper/general');
const { statusCode } = require('../config/constants');
const Model = require('../models');

class userService {
    register = async ({ body }) => {
        let exist = await Model.Users.findOne({ where: { email: body.email } });

        if (exist && Object.keys(exist.dataValues).length > 0)
            throw new ErrorHandler(statusCode.CONFLICT, `Data Already exist`);

        //hash the password
        body.password = await hashPassword(body.password.trim());

        //create jwt for 24 hours
        let authToken = await jwtToken(parse({ email: body.email }), `24h`);

        await Model.Users.create({ ...body });

        return { authToken }
    }
    checkUserData = async (body) => {

        let getUser = await Model.Users.findOne({ where: { email: body.email } });

        //if user exist OR db password  is NULL OR passwords don't match
        if (getUser == null || getUser.dataValues.password == null || !verifyPassword(getUser.dataValues.password, body.password))
            throw new ErrorHandler(statusCode.UNAUTHORIZED, `Invalid Credentials`);

        delete getUser.dataValues.password;
        return getUser.dataValues;
    }

}

module.exports = new userService();