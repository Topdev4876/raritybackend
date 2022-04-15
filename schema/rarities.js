const mongoose = require('mongoose')

// const foodSchema = new mongoose.Schema({
//     foodname:{
//         type: String,
//         required: true,
//     },
//     sinceiate: {
//         type:Number,
//         required: true
//     }
// })

// module.exports = mongoose.model("food",foodSchema)

//-----------------------------------------------------------------

const RaritySchema = new mongoose.Schema({
    score:{
        type: String,
        required: true,
    }
})


module.exports = mongoose.model("Rarity",RaritySchema)