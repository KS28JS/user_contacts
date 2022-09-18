const catchAsync = require("../common/middleware/catchAsync");
const contactService = require('../services/userContacts');
const Response = require('../common/helper/response');
const { statusCode } = require("../config/constants");

class UserContacts {
    create = catchAsync(async (req, res) => {
        let create = await contactService.create(req);
        Response.successResponse(res, statusCode.CREATED, ` Cotact created successfully !`, create);

    });

    update = catchAsync(async (req, res) => {
        let update = await contactService.update(req);
        Response.successResponse(res, statusCode.CREATED, ` Cotact updated successfully !`, update);
    });

    get = catchAsync(async (req, res) => {
        let get = await contactService.get(req);
        Response.successResponse(res, statusCode.CREATED, ` Cotact(s) fetched successfully !`, get);
    });

    delete = catchAsync(async (req, res) => {
        let deleted = await contactService.delete(req);
        Response.successResponse(res, statusCode.CREATED, ` Cotact deleted successfully !`, deleted);
    });


}

module.exports = new UserContacts();