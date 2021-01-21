const userRepo = require('./repository')
const { User } = require('./models/user')
const usersUseCases = require('./use-cases')

module.exports = function (router) {

    // create user
    router.post('/', (req, res, next) => {
        const { user } = req.body
        usersUseCases.createUser(user)
            .then(u => {
                console.log(u)
                return res.json({
                    msg: 'User created'
                })
            })
            .catch(async (params) => {
                try { await userRepo.deleteOne({ _id: user._id }) } catch (e) { }
                return next(params)
            })
    })

    // login
    router.post('/login', async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await userRepo.getUserWithPasswordHash({ email: email.toLowerCase() })
            if (!user) {
                const err = new Error('User does not exist.')
                err.code = 404
                throw err
            }

            // check if passwords match
            user.comparePassword(password, async (err, isMatch) => {
                if (err) {
                    return next(err)
                }

                if (!isMatch) {
                    const error = new Error('User does not exist.')
                    error.code = 404
                    return next(error)
                }
                
                // if user is found and password is right create a token
                const token = await user.generateJwt()
                // return the information including token as JSON
                res.json({ msg: 'Signed in', data: { token: token } })
            })

        } catch (err) {
            next(err)
        }
    })

    // get
    router.get('/:user_id', (req, res, next) => {
        const { user_id: userId } = req.params
        if (!userId) {
            return res.status(400).json({ error: true, message: errorMessages.MISSING_PARAM, errorData: req.body })
        }
        return userRepo.getUserById(userId)
            .then(user => {
                return res.status(200).json({ msg: 'success', data: user })
            }).catch(next)
    })

    // delete
    router.delete('/:user_id', (req, res, next) => {
        const { user_id: userId } = req.params
        if (!userId) {
            return res.status(400).json({ error: true, message: errorMessages.MISSING_PARAM, errorData: req.body })
        }
        return userRepo.deleteOne({ _id: userId })
            .then(() => {
                return res.json({
                    msg: 'User deleted',
                })
            })
            .catch(err => next(err))
    })

    // update
    router.put('/:user_id', (req, res, next) => {
        const userId = req.params.user_id
        return usersUseCases.updateUserById(userId, req.body)
            .then(updatedUser => {
                return res.json({
                    msg: 'User updated',
                    data: updatedUser
                })
            }).catch(next)
    })

    return router
}