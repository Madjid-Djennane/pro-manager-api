const express = require('express')

const users = require('./modules/users/api')
const projects = require('./modules/projects/api')
const tasks = require('./modules/tasks/api')

module.exports = function() {
    const router = express.Router()

    router.use('/users', users(express.Router()))
    /* router.use('/projects', projects(express.Router()))
    router.use('/tasks', tasks(express.Router())) */

    return router
}