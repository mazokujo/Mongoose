const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Well done Connection successful")
    })
    .catch((err) => {
        console.log("Error Signaled!!!!")
        console.log(err);
    });
const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullname').get(function () {
    return `${this.first} ${this.last}`
})


personSchema.pre('save', async function () {
    console.log('ABOUT TO SAVE !!!')
});
personSchema.post('save', async function () {
    console.log('JUST SAVED!!!!')
});
const person = mongoose.model('person', personSchema);