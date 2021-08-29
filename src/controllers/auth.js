const { User } = require('../../models');

// Import Package
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER 
exports.register = async (req,res) => {
    // Membuat Schema
    const schema = Joi.object({
        fullName: Joi.string().min(2).required(),
        email: Joi.string().email().min(9).required(),
        password: Joi.string().min(8).required(),
    })

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })
    }

    const isEmailExist = await User.findOne({ where: { email: req.body.email }})
    if(isEmailExist) {
        return res.status(400).send({
            error: {
                message: "email existed",
            },
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser.id}, process.env.TOKEN_KEY);
        res.status(200).send({
            status: "success",
            message: "new user successful created",
            data: {
                user: {
                    fullName: newUser.fullName,
                    email: newUser.email,
                    token
                }
            },
        });
    } catch(error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

// LOGIN
exports.login = async (req,res) => {
    // Membuat Schema
    const schema = Joi.object({
        email: Joi.string().email().min(9).required(),
        password: Joi.string().min(8).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })
    }

    try {
        const userExist = await User.findOne({ where: { email: req.body.email }})

        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        if (!isValid) {
            return res.status(400).send({
                error: {
                    message: "invalid password"
                }
            })
        };

        const token = jwt.sign({ id: userExist.id}, process.env.TOKEN_KEY)
        res.status(200).send({
            status: "success",
            data: {
                user: {
                    fullName: userExist.fullName,
                    email: userExist.email,
                    token
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}