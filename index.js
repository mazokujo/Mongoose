const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playstationIps', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Well done Connection successful")
    })
    .catch((err) => {
        console.log("Error Signaled!!!!")
        console.log(err);
    });

const playstationIpSchema = new mongoose.Schema({
    title: String,
    platform: String,
    year: Number,
    metacritic: Number
})

const playstationIp = mongoose.model('playstationIp', playstationIpSchema);

const infamous = new playstationIp({ title: "infamous", platform: "playstation 3", year: 2008, metacritic: 8 });
infamous.save()
    .then(data => {
        console.log('save successful');
        console.log(data)
    })
    .catch(err => {
        console.log('error reported');
        console.log('err')
    })
// playstationIp.insertMany([
//     { title: "uncharted", platform: "playstation 3", year: 2007, metacritic: 9 },
//     { title: "Horizon zero dawn", platform: "playstation 4", year: 2017, metacritic: 8.9 },
//     { title: "god of war", platform: "playstation 2", year: 2002, metacritic: 9 },
//     { title: "spiderman", platform: "playstation 4", year: 2008, metacritic: 8.9 },
//     { title: "days gone", platform: "playstation 4", year: 2019, metacritic: 7.5 },
//     { title: "the last of us", platform: "playstation 3", year: 20013, metacritic: 10 }
// ])
// .then(data=>{
//     console.log("It worked");
//     console.log(data);
// })
// .catch(err=>{
//     console.log("error in the process!!!")
//     console.log(err);
// })


// MODULE 382: FIND DATA USING MONGOOSE
// to find data inside the model, you can use mangoose.
// model.find({})=> this gives you a query but not the exact data you want
// you use a query like:
//mongoose.model.find({name:'john', age: {$gte:18}, salary: {$lte:40000}, })
// since the above process can be lengthy, you can treat as callbacks
//you can also treat the result like a promise as shown below
//mongoose.model.find({name:'john', age: {$gte:18}, salary: {$lte:40000}, }).then(data => console.log(data));
//you can also used findById as shown below. this method does not require extra details about the data targeted
//model.findById(id).then(data => console.log(data));

//MODULE 383: UPDATE DATA INSIDE OF MONGOOSE
//to update data in your database use the following
//model.updateOne({name: name}, {age: updated age}).then(data => console.log(data));
// the execution of function model.updateOne({}), does not return the value of the updated data as would otherwisw function model.find do.
// .updateOne function is pretty straightforward, while the function.updateMany() will help you update several entries in the collection or model
//you have to find the target entry then add the update you want as shown below
//movie.updateMany({title: {$in: ['Amadeus', 'Stand By me']}}, {score:10}).then(ip => console.log(ip));
//findOneAndUpdate can also be used as shown below
// model.findOneAndUpdate({target entry},{updated information or data}).then(data => console.log(data));
//it should be noted that another argument should be added to the function so that the response displays the newer version
//// model.findOneAndUpdate({target entry},{updated information or data},{new:true}).then(data => console.log(data));

//MODULE 384: DELETE IN MONGOOSE
//you can use remove to delete data in mongoose 
//playstationIp.remove({_id: '60bb9c38d1539f0d1055b677'}).then(data => console.log(data))
// or you can use function .deleteMany
//playstationIp.deleteMany({ _id:{$in: [60bb9c38d1539f0d1055b672,60bb9c38d1539f0d1055b674,60bb9c38d1539f0d1055b673,60bb9c38d1539f0d1055b675,60bb9c38d1539f0d1055b676]}}).then(data => console.log(data)).catch(err =>console.log(err))
//db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
//