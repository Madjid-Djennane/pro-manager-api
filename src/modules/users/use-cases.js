const userRepo = require('./repository')
const { roles } = require('../../helpers/constants')

const getUserById = (id) => {
    return userRepo.getUserById(id)
}


/**
 * Create user
 * @param {Object} user 
 */
const createUser = user => {
    return userRepo.createUser({ ...user, email: user.email.toLowerCase(), role: roles.BASIC })
}

module.exports = {
    createUser,
    getUserById
}