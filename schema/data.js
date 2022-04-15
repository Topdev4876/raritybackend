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

const dataSchema = new mongoose.Schema({
    
    BACKGROUND:{
        type: String,
        required: true,
    },
    PATTERN:{
        type: String,
        required: true,
    },
    FUR:{
        type: String,
        required: true,
    },
    SKIN:{
        type: String,
        required: true,
    },
    SHIRTS:{
        type: String,
        required: true,
    },
    HEADWEAR:{
        type: String,
        required: true,
    },
    FACIAL:{
        type: String,
        required: true,
    },
    EYES:{
        type: String,
        required: true,
    },
    EYEWEAR:{
        type: String,
        required: true,
    },
})


module.exports = mongoose.model("data",dataSchema)