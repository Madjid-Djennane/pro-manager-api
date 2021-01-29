const projectRepo = require('./repository')
const usersUseCases = require('../users/use-cases')

/**
 * Create new project 
 * @param {Object} params 
 * @returns
 */
const createProject = async (params, admin) => {
    const { name, description, members } = params
    members.push('madjid@ynov.com')
    const membersRes = await usersUseCases.getUsers({ email: members })
    const project = Object.assign({
        name,
        description,
        members: membersRes.map(m => m._id),
        admin
    })
    return projectRepo.createProject(project)
}

/**
 * push taskId to project.tasks 
 * @param {string} projectId 
 * @param {string} taskId 
 */
const addTaskToProject = (projectId, taskId) => {
    return projectRepo.updateOne({ _id: projectId }, {$push: { tasks: taskId } })
}

/**
 * get project by id
 * @param {string} projectId 
 */
const getProject = projectId => {
    return projectRepo.getProjectById(projectId)
}

module.exports = {
    createProject,
    addTaskToProject,
    getProject
}