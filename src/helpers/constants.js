const roles = {
    ADMIN: 'admin',
    BASIC: 'basic'
}

const tasksPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
}
const tasksStatus = {
    PENDING: 'pending',
    ASSIGNED: 'assigned',
    IN_PROGRESS: 'in_progress',
    REVIEW: 'review',
    COMPLETED: 'completed',
    WONT_FIX: 'wont_fix'
}

const tasksCategories = {
    BUG: 'bug',
    IMPROVEMENT: 'improvement',
    FEATURE: 'feature'
}

module.exports = {
    roles,
    tasksPriority,
    tasksStatus,
    tasksCategories
}