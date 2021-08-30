const { Topping } = require('../../models');

// GET ALL TOPPINGS
exports.getToppings = async (req,res) => {
    try {
        const toppings = await Topping.findAll({
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        });

        if (!toppings) {
            return res.status(404).send({
                message: "no topping available",
                data: []
            })
        }

        res.status(200).send({
            status: "success",
            data: {
                toppings
            },
        });
    } catch (error) {
        // server error
        console.log(error);
        return res.status(500).send({
            message: "server error"
        })
    }
}

// GET A TOPPING BY ID
exports.getTopping = async (req,res) => {
    try {
        const { id } = req.params;
        const topping = await Topping.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        if (!topping) {
            return res.status(404).send({
                message: "no topping available",
                data: []
            })
        }

        res.status(200).send({
            status: "success",
            data: {
                topping
            },
        });
    } catch (error) {
        // server error
        console.log(error);
        return res.status(500).send({
            message: "server error"
        })
    }
}

// ADD NEW TOPPING
exports.addTopping = async (req,res) => {
    try {
        const { ...data} = req.body;

        await Topping.create({
            ...data,
            image: req.file.filename
        });

        const toppingData = await Topping.findOne({
            where: {
                ...data
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        res.status(200).send({
            message: "a new topping successfully added",
            data: {
                product: toppingData
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

exports.editTopping = async (req,res) => {
    try {
        const { id } = req.params;
        const { data} = req.body;

        const checkTopping = await Topping.findOne({ where: { id }});

        if (!checkTopping) {
            return res.status(404).send({
                status: "id not found"
            });
        }

        await Topping.update({
            ...data,
            image: req.file.filename
        }, { where : { id }})

        

        const topping = await Topping.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.status(200).send({
            message: `topping with id ${id} succesfully updated`,
            data: {
                topping
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

exports.deleteTopping = async (req,res) => {
    try {
        const { id } = req.params;
        const topping = await Topping.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });
    
        if(!topping) {
            return res.status(404).send({
                message: `topping with id ${id} not found`,
                data: []
            })
        }
    
        await Topping.destroy({ where: { id }})
    
        res.status(200).send({
            message: "topping successfully deleted",
            data: {
                id
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