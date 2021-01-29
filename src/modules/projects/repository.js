const { Project } = require('./models/project')

const createProject = project => {
    const newProject = new Project(project)
    return newProject.save()
}

/**
 * update one project
 * @param {Object} filter 
 * @param {Object} set 
 * @returns
 */
const updateOne = (filter, set) => {
    return Project.updateOne(filter, set)
}

/**
 * get project by id
 * @param {string} projectId 
 * @returns
 */
const getProjectById = projectId => {
    return Project.findById(projectId).populate('tasks members admin')
}


module.exports = {
    createProject,
    updateOne,
    getProjectById
}