const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
    {
        name: { type: String},
        description: { type: String },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
)

const Project = mongoose.model('Project', projectSchema)

module.exports = { Project }