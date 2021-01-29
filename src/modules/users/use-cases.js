const userRepo = require('./repository')
const { roles } = require('../../helpers/constants')


/**
 * get user by id
 * @param {string} id 
 * @returns
 */
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

/**
 * get users that match params
 * @param {Object} params 
 * @returns
 */
const getUsers = params => {
    return userRepo.getUsers(params)
}

/**
 * get user projects
 * @param {string} userId 
 */
const getUserProjects = userId => {
    return userRepo.getUserProjects(userId)
}

/**
 * Add project to users
 * @param {string} projectId 
 * @param {string[]} members 
 */
const addProjectToUsers = (projectId, members) => {
    return userRepo.updateMany( { _id: members }, {$push: { projects: projectId } })
}


module.exports = {
    createUser,
    getUserById,
    getUsers,
    getUserProjects,
    addProjectToUsers
}