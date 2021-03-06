const products = require('../data/products');
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

function findById() {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id);
        resolve(product);
    })
}

function create(product) {
    return new Promise((reslove, reject) => {
        const newProduct = { id: uuidv4(), ...product }
        products.push(newProduct)
        writeDataToFile('./data/products.json')
        resole(newProduct)
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        products[index] = { id, ...products }
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id);
        writeDataToFile('./data/products.json', products)
        resolve(products[index]);
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}