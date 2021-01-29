const taskRepo = require('./repository')


/**
 * create new task
 * @param {Task} task 
 */
const addTask = task => {
    return taskRepo.insertTask(task)
}

/**
 * update task by id
 * @param {string} taskId 
 * @param {Object} params 
 * @returns
 */
const updateTask = (filter, params) => {
    return taskRepo.update(filter, params)
}

module.exports = {
    addTask,
    updateTask
}