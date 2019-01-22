const fs = require('fs');
const path = require('path');

const basepath = require('../helpers/path');

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
     * 
     * @param {string} title 
     * @param {string} imageUrl 
     * @param {string} description 
     * @param {number} price 
     */
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }


    /**
     * 
     */
    save() {
        this.id = Math.random().toString();

        getProductsFromFile((products) => {
            products.push(this);
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
}