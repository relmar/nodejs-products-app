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
}