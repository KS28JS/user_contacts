const { Op } = require('sequelize');
const { ErrorHandler } = require('../common/helper/error');
const { statusCode } = require('../config/constants');
const Model = require('../models');

class userContactsService {

    create = async ({ body }) => {
        let exist = await Model.UserContacts.findOne({ where: { phone_number: body.phone_number, user_id: body.user.id } });
        if (exist && Object.keys(exist.dataValues.length > 0))
            throw new ErrorHandler(statusCode.CONFLICT, `Number Exist`);

        return await Model.UserContacts.create(
            { full_name: body.full_name, phone_number: body.phone_number, email: body.email, user_id: body.user.id }
        );
    }

    update = async ({ body }) => {
        let exist = await Model.UserContacts.findOne({ where: { user_id: body.user.id, id: { [Op.ne]: body.contact_id } } });
        if (exist && Object.keys(exist.dataValues.length > 0))
            throw new ErrorHandler(statusCode.CONFLICT, `Number Exist`);
        return await Model.UserContacts.update(
            { full_name: body.full_name, phone_number: body.phone_number, email: body.email },
            { where: { id: body.contact_id } }
        );
    }

    delete = async ({ params }) =>
        Model.UserContacts.destroy({ where: { id: params.id } });


    get = async ({ query, body }) => {
        let where = {
            ...query.id && { id: query.id },
            user_id: body.user.id
        };

        return await Model.UserContacts.findAll({ where });
    }
}

module.exports = new userContactsService();