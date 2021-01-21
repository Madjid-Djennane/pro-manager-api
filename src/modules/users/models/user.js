const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const { roles } = require('../../../helpers/constants')

const userSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true },
        lastname: { type: String, trim: true },
        role: {
            type: String,
            lowercase: true,
            enum: Object.values(roles),
            required: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false,
            minlength: [6, 'Password too short (min 6 chars.)']
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
        },
        projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]

    }
)

userSchema.pre('save', function(next) {
    const user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, function (error, hash) {
                if (error) {
                    return next(error)
                }
                user.password = hash
            })
        })
    }

    return next()
})

userSchema.methods.generateJwt = function () {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)
    const payload = {
        _id: this._id,
        exp: parseInt(expiry.getTime() / 1000)
    }
    return jwt.sign(payload, process.env.SECRET)
}

userSchema.methods.comparePassword = function (passw, cb) {
    console.log('password: ', passw)
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

userSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        const err = new Error('User already exists')
        err.code = 400
        next(err)
    } else {
        next(error)
    }
})


const User = mongoose.model('User', userSchema)

module.exports = { User }