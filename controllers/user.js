const catchAsync = require('../common/middleware/catchAsync');
const userService = require('../services/user');
const Response = require('../common/helper/response');
const { statusCode } = require('../config/constants');
const { jwtToken, parse } = require('../common/helper/general');

class User {
    register = catchAsync(async (req, res) => {
        let register = await userService.register(req);
        Response.successResponse(res, statusCode.CREATED, `Registered Successfully !`, register);
    });


    signin = catchAsync(async (req, res) => {
        //service to check user exist or not with verify password
        let user = await userService.checkUserData(req.body);
        //create jwt for 24 hours
        let authToken = await jwtToken(parse(user), `24h`);

        Response.successResponse(res, statusCode.CREATED, `Signed In Successfully !`, { authToken, user });
    });
}

module.exports = new User();