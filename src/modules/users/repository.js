const { User } = require('./models/user')

/**
 * Get user by id
 * @param {string} userId 
 */
const getUserById = userId => {
    return User.findById(userId)
}

/**
 * Return users that match filters in params
 * @param {Object} params 
 */
const getUsers = params => {
    return User.find(params)
}

/**
 * Create new User
 * @param {User} user 
 */
const createUser = user => {
    const newUser = new User(user)
    return newUser.save()
}

/**
 * Update user by id 
 * @param {String} id 
 * @param {Object} update 
 */
const updateUserById = (id, update) => {
    return User.findById(id)
        .then(user => {
            user.set(update)
            return user.save()
        })
}

/**
 * Delete user that match params
 * @param {*} params 
 */
const deleteUser = params => {
    return User.deleteOne(params)
}

/**
 * 
 * @param {*} params 
 */
const getUserWithPasswordHash = (params) => {
    return User.findOne(params).select('+password')
}

/**
 * get user by id then populate and select projects
 * @param {string} userId 
 */
const getUserProjects = userId => {
    return User.findById(userId).populate({
        path: 'projects',
        populate: {
            path: 'members admin'
        }
    }).then(u => u.projects)
}

/**
 * update many users
 * @param {any} filter 
 * @param {any} set 
 * @returns
 */
const updateMany = (filter, set) => {
    return User.updateMany(filter, set).then(res => res)
}

module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUserById,
    deleteUser,
    getUserWithPasswordHash,
    getUserProjects,
    updateMany
}