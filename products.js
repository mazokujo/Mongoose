const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Well done Connection successful")
    })
    .catch((err) => {
        console.log("Error Signaled!!!!")
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        uppercase: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price must be positive!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    stock: {
        instore: {
            type: Number,
            min: 0
        },
        online: {
            type: Number,
            min: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L'],
        uppercase: true
    }
})
//find instance of product and use newly created instance method on it.

productSchema.methods.greet = function () {
    console.log("HI, hey howzit!!!")
    console.log(`-from ${this.name}`)
};
//use an instance function to change onsale from false to true or vice versa

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale
    return this.save();
};
// create a new category
productSchema.methods.addCategory = function (newcat) {
    this.categories.push(newcat);
    return this.save();
}
// create static function firesale, it comes before mongoose model product.
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 });
    // return this.save();
};

const product = mongoose.model('product', productSchema);
const kimonoShirt = new product({ name: 'kimonoShirt', price: 24.99, categories: ['clothing'], stock: { instore: 13, online: 9 }, size: 'l' });
//make use of async function since mongoose is based on async functions
kimonoShirt.save();

// const findProduct = async () => {
//     const findone = await product.findOne({ name: 'KIMONOSHIRT' });
//     findone.greet();
//     await findone.toggleOnSale()
//     console.log(findone)
//     await findone.addCategory('summer outfit')
//     console.log(findone)
// }

// findProduct();

// static method


const allSale = async () => {
    const dropPrice = await product.fireSale();
    console.log(dropPrice);
}

allSale();

// // product.findOneAndUpdate({ name: 'iphone' }, { price: -19.99, size: 'xs' }, { new: true, runValidators: true })
// kimonoShirt.save()
//     .then(data => {
//         console.log("data sent, it's worked");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('oh oh!!! error reported');
//         console.log(err)
//     });
// product.insertMany({ name: 'po', price: 2 }, { name: 'aw', price: 3 }).then(p => console.log(p))