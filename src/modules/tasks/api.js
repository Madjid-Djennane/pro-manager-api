const { authorize } = require("../../plugins/passport")
const tasksUsesCase = require('./use-cases')
const projectsUseCases = require('../projects/use-cases')

module.exports = function (router) {

    // create task
    router.post('/', authorize(), (req, res, next) => {
        return tasksUsesCase.addTask(req.body)
            .then(result => {
                return projectsUseCases.addTaskToProject(result.project, result._id)
            })
            .then(result => {
                return res.status(201).json({ msg: 'task created', data: result })
            }).catch(err => next(err))
    })

    // update task
    router.put('/:task_id', authorize(), (req, res, next) => {
        const { task_id: taskId } = req.params
        return tasksUsesCase.updateTask({ _id: taskId }, req.body)
            .then(result => {
                return res.status(204).json('resource updated successfully')
            })
            .catch(err => next(err))
    })

    return router
}