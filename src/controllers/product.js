const { Product } = require('../../models');

// GET ALL PRODUCTS
exports.getProducts = async (req,res) => {
    try {
        const products = await Product.findAll({
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        });

        if (!products) {
            return res.status(400).send({
                message: "no product available",
                data: []
            })
        }

        res.status(200).send({
            status: "success",
            data: {
                products
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

// GET A PRODUCT BY ID
exports.getProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        if (!product) {
            return res.status(400).send({
                message: "no product available",
                data: []
            })
        }

        res.status(200).send({
            status: "success",
            data: {
                product
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

// ADD NEW PRODUCT
exports.addProduct = async (req,res) => {
    try {
        const { ...data} = req.body;

        const newProduct = await Product.create({
            ...data,
            image: req.file.filename
        });

        res.status(200).send({
            message: "a new Product successfully added",
            data: {
                product: newProduct
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

exports.editProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const { data} = req.body;

        const checkProduct = await Product.findOne({ where: { id }});

        if (!checkProduct) {
            return res.status(404).send({
                status: "id not found"
            });
        }

        await Product.update({
            ...data,
            image: req.file.filename
        }, { where : { id }})

        

        const product = await Product.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.status(200).send({
            message: `product with id ${id} succesfully updated`,
            data: {
                product
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

exports.deleteProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });
    
        if(!product) {
            return res.status(404).send({
                message: `product with id ${id} not found`,
                data: []
            })
        }
    
        await Product.destroy({ where: { id }})
    
        res.status(200).send({
            message: "product successfully deleted",
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