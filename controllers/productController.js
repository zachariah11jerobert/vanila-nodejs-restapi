const Product = require('../models/productModel');

const { getPostData } = require('../utils');

// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, { 'Conrent-Type': 'application/json' });
    } catch (error) {
        console.log(error);
    }
}

// @desc Gets Single Product
// @route GET /api/product/:id
async function getProducts(req, res) {
    try {
        const products = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
        res.writeHead(200, { 'Conrent-Type': 'application/json' });
    } catch (error) {
        console.log(error);
    }
}

// @desc    Create a Product
// @route   POST /api/products
async function createProduct(req, res) {
    try {
        const body = await getPostData();
        const { title, description, price } = JSON.parse(body);
        const product = {
            title: 'Test Product',
            description: 'This is my product',
            price: 100
        }

        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            const { title, description } = JSON.parse(body);

            const newProduct = await Product.create(product);

            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newProduct));
        })

        // const newProduct = Product.create(product);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            const product = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, product)

            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newProduct))
        }
    } catch (error) {
        console.log(error)
    }
}

async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct
}