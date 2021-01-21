const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
const usersUseCases = require('../modules/users/use-cases')
const { roles: rolesList } = require('../helpers/constants')

const initialize = function (app) {
    // init default passport behavior
    app.use(passport.initialize())
    // add jwt strategy
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
    }
    passport.use(
        new JwtStrategy(opts, function (jwtPayload, done) {
            usersUseCases.getUserById(jwtPayload._id)
                .then(user => {
                    if (user) {
                        done(null, user)
                    } else {
                        done(null, false)
                    }
                })
                .catch(() => {
                    done(null, false)
                })
        })
    )
}

/**
 * Checks if user has necessary role to access route
 * @param {*} roles - a role, array of roles, or empty for all roles
 */
const authorize = function (roles = [rolesList.ADMIN, rolesList.BASIC]) {

    let authorizedRoles
    // if admin, then only admin are authorized
    if (roles.length === 1 && roles[0] === rolesList.ADMIN) {
        authorizedRoles = [...Object.values(rolesList)]
    } else {
        authorizedRoles = [...roles]
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        (req, res, next) => {
            passport.authenticate('jwt', { session: false })(req, res, next)
        },

        // authorize based on user role
        (req, res, next) => {
            if (authorizedRoles.length && !authorizedRoles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(403).json({ message: 'Unauthorized: role was not found in user roles' })
            }

            // authentication and authorization successful
            next()
        },
    ]
}

module.exports = { initialize, authorize }
