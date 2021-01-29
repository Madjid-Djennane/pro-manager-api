const { Task } = require('./models/task')


/**
 * insert task to data base
 * @param {task} task 
 */
const insertTask = task => {
    const newTask = new Task(task)
    return newTask.save()
}

/**
 * update task that match filter and apply params changes
 * @param {Object} filter 
 * @param {Object} params 
 * @returns
 */
const update = (filter, params) => {
    return Task.updateOne(filter, params)
}

module.exports = {
    insertTask,
    update
}