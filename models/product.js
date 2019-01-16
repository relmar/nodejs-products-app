const fs = require('fs');
const path = require('path');

const basepath = require('../helpers/path');

module.exports = class Product {

    constructor(title) {
        this.title = title;
    }

    save(callback) {
        const filePath = path.join(basepath, 'data', 'products.json');
        
        fs.readFile(filePath, (err, data) => {
            let products = [];
            if (!err) {
                try {
                    products = JSON.parse(data);
                } catch (e) {
                    products = [];
                }
            }
            products.push(this);
            try {
                fs.writeFile(filePath, 'sdfsf', err => {
    
                    console.log('saved');
                });

            } catch (e) {
                console.log(e);
                
            }
        });
    }

    static fetchAll(callback) {
        const filePath = path.join(basepath, 'data', 'products.json');
        
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

    }
}