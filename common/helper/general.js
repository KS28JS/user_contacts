const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { statusCode } = require('../../config/constants');
const { ErrorHandler } = require('./error');

const errorMessage = (errObj, throwError = false) => {
    const commonMessage = `Something went wrong!`;
    let message = errObj?.message || errObj || commonMessage;
    if (message.includes(`WHERE parameter`) || message.includes(`Cannot add or update a child row`)) message = 'Please try again.....';
    if (throwError) throw new TypeError(message);
    return (message);
};

const parse = el => JSON.parse(JSON.stringify(el));

const hashPassword = pwd => {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null);
};

const verifyPassword = (dbPassword, checkPassword) => {
    return bcrypt.compareSync(checkPassword, dbPassword);
};

// create json web token
const jwtToken = (user, expiresIn) => {
    let createToken = jwt.sign(user, `Contact as jwt secret`, { expiresIn });
    return createToken;
};

// verify jwt token
const verifyJWToken = (token) => {
    let tokenData = jwt.verify(token, `Contact as jwt secret`);
    console.log(" Verifying token : : :", tokenData);
    if (!tokenData) throw new ErrorHandler(statusCode.BAD_REQUEST, `Session expired.Please try again`)
    return tokenData;
}



module.exports = {
    errorMessage,
    parse,
    hashPassword,
    verifyPassword,
    jwtToken,
    verifyJWToken
}