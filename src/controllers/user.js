const { User } = require('../../models')

// GET USERS
exports.getUsers = async (req,res) => {
    try {
        // init users
        const users = await User.findAll({
            attributes: {
                exclude: ["password", "createdAt", "updatedAt", "status", "isAdmin"]
            }
        })

        // hasil respon
        res.send({
            status: "success",
            data: {
                users
            }
                
        })

    } catch (error) {
        // server error
        console.log(error);
        return res.status(500).send({
            message: "server error"
        })
    }
}


// GET USER WTIH CERTAIN ID
exports.getUser = async (req,res) => {
    try {
        // id user
        const {id} = req.params;
        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "updatedAt", "status", "isAdmin", "password"]
            }
        })

        // jika user yang dicari tidak ada
        if(!user) {
            return res.status(404).send({
                status: `user with id ${id} not found`,
            })
        }

        // hasil respon 
        res.send({
            status: "success",
            data: {
                user
            }
        })
    } catch (error) {
        // server error
        console.log(error);
        return res.status(500).send({
            message: "server error"
        })
    }
}

// DELETE USER WITH CERTAIN ID
exports.deleteUser = async (req,res) => {
    try {
        // id user
        const {id} = req.params;
        const checkUser = await User.findOne({
            where: {
                id
            }
        })

        // jika user yang dihapus tidak ada
        if (!checkUser) {
            res.status(404).send({
                message: `user ${id} not found`,
            })
        }

        await User.destroy({
            where: {
                id
            }
        });

        res.send({
            status: "success",
            message: `Delete user id: ${id} finished`
        })

    } catch (error) {
        // server error
        console.log(error);
        return res.status(500).send({
            message: "server error"
        })
    }
}
