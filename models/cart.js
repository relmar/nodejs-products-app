const fs = require('fs');
const path = require('path');

const basepath = require('../helpers/path');

const filePath = path.join(basepath, 'data', 'cart.json');

const CartItem = class CartItem {
    constructor(productId, quantity) {
        this.id = productId;
        this.quantity = quantity;
    }

    inc() {
        ++this.quantity;
    }

    dec() {
        --this.quantity;
    }
}

module.exports = class Cart {
    /**
     * 
     * @param {Product} product 
     * @param {number} quantity 
     */
    static addProduct(product, quantity) {
        fs.readFile(filePath, (err, data) => {
            let cart = {
                products: [],
                totalPrice: 0
            }

            if (!err) {
                try {
                    cart = JSON.parse(data);
                } catch (error) {

                }
            }

            const existingProductIndex = cart.products.findIndex(_product => {
                return _product.id === product.id;
            });

            // there is no products
            if (existingProductIndex < 0) {
                cart.products.push(new CartItem(product.id, 1));
                cart.totalPrice = +product.price.trim();
            } else {
                const existingProduct = cart.products[existingProductIndex];
                existingProduct.quantity++;
                cart.products[existingProductIndex] = existingProduct;
                cart.totalPrice += +product.price.trim();
            }

            fs.writeFile(filePath, JSON.stringify(cart), errr => {
                console.log(err);
            });
        });
    }

    /**
     * 
     * @param { function } callback 
     */
    static getCart(callback) {
        fs.readFile(filePath, (err, data) => {
            let cart = {
                products: [],
                totalPrice: 0
            }

            if (!err) {
                try {
                    cart = JSON.parse(data);
                } catch (error) {

                }
            }

            callback(cart.products, cart.totalPrice);
        });
    };


    /**
     * 
     * @param {Product} product 
     */
    static deleteProduct(product) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return false;
            }

            let cart = {}

            try {
                cart = JSON.parse(data);
            } catch (error) {

            }

            if (cart) {
                const existingProductIndex = cart.products.findIndex(_product => {
                    return _product.id === product.id;
                });

                if (existingProductIndex) {
                    const productQuantity = cart.products[existingProductIndex].quantity;
                    cart.products.splice(existingProductIndex, 1);
                    cart.totalPrice = cart.totalPrice - (product.price * productQuantity);
                }

                fs.writeFile(filePath, JSON.stringify(cart), errr => {
                    console.log(err);
                });
            }
        });

    }
}