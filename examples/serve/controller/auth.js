const jwt = require('jsonwebtoken');
const assert = require('http-assert');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    assert(token, 422, '请先登录！');
    let id;
    try {
        id = jwt.verify(token, req.app.get('jwtKey'));
    } catch (err) {
        assert(false, 401, 'jwt错误！重新登录!001')
    }
    const user = await User.findById(id.id);
    assert(user, 401, 'jwt错误！重新登录！002');
    req.user = user;
    next();
}
