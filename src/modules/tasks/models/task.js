const mongoose = require('mongoose')
const { tasksPriority, tasksStatus } = require('../../../helpers/constants')

const taskSchema = mongoose.Schema(
    {
        title: { type: String},
        description: { type: String },
        priority: { type: String, enum: Object.values(tasksPriority) },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        category: { type: [String] },
        status: { type: String, enum: Object.values(tasksStatus) },
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
    }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = { Task }