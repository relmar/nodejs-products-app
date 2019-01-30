const fs = require('fs');
const path = require('path');

const basepath = require('../helpers/path');
const Cart = require('./cart');

const filePath = path.join(basepath, 'data', 'products.json');

/**
 * 
 * @param {function} callback 
 */
const getProductsFromFile = (callback) => {
    fs.readFile(filePath, (err, data) => {
        let products = [];
        if (!err) {
            try {
                products = JSON.parse(data);
            } catch (e) {
                products = [];
            }
        }
        callback(products);
    })
};

module.exports = class Product {

    /**
     * @param {string} id  
     * @param {string} title 
     * @param {string} imageUrl 
     * @param {string} description 
     * @param {number} price 
     */
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }


    /**
     * 
     */
    save() {
        getProductsFromFile((products) => {
            if (!this.id) {
                this.id = Math.random().toString();
                products.push(this);

            } else {
                const existingProductIndex = products.findIndex(product => {
                    return product.id === this.id;
                });
                products[existingProductIndex] = this;
            }

            try {
                fs.writeFile(filePath, JSON.stringify(products), err => {
                    console.log('saved');
                });

            } catch (e) {
                console.log(e);
            }
        })
    }


    /**
     * 
     * @param {function} callback 
     */
    static fetchAll(callback) {
        getProductsFromFile(callback);
    }


    /**
     * 
     * @param {number} id 
     * @param {function} callback 
     */
    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(prod => {
                return prod.id == id;
            });

            callback(product);
        })
    }

    /**
     * 
     * @param {number} id 
     */
    static deleteById(id) {
        getProductsFromFile(products => {
            const productIndex = products.findIndex(prod => {
                return prod.id === id;
            });

            const product = products[productIndex];
            products = products.splice(productIndex, 1);

            fs.writeFile(filePath, JSON.stringify(products), err => {
                if (!err) {
                    Cart.deleteProduct(product);
                    console.log('removed');
                }
            });
        })
    }
}