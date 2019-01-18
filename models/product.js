const fs = require('fs');
const path = require('path');

const basepath = require('../helpers/path');

const filePath = path.join(basepath, 'data', 'products.json');

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

    constructor(title) {
        this.title = title;
    }

    save(callback) {
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

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}