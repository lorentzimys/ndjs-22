const { mockUser } = require('./__mocks__/user');
const { User } = require('../models/User');

/**
 * Login user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = (req, res) => res.status(201).send(new User(mockUser));

module.exports = { login }
