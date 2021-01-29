const { authorize } = require("../../plugins/passport")
const projectsUseCases = require('./use-cases')
const usersUseCases = require('../users/use-cases')

module.exports = function (router) {
    // post project
    router.post('/', authorize(), (req, res, next) => {
        const userId = req.user._id
        return projectsUseCases.createProject(req.body, userId)
            .then(async result => {
                if (!result) {
                    throw Error('internal server error')
                }
                let members = result.members
                members.push(userId)
                return await usersUseCases.addProjectToUsers(result._id, members)
            })
            .then(() => {
                res.status(201).json({ msg: 'project created', data: {} })
            })
            .catch(err => next(err))
    })

    // get project
    router.get('/:project_id', authorize(), (req, res, next) => {
        const { project_id: projectId } = req.params

        return projectsUseCases.getProject(projectId)
            .then(result => {
                res.status(200).json({ msg: 'project', data: result })
            })
            .catch(err => next(err))
    })

    return router
}