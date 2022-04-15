const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fetch = require('node-fetch')
require('dotenv').config()

const dataSchema = require('./schema/data')
const RaritySchema = require('./schema/rarities')
const app = express()

const background_traits = ["Black","Blue","Brown","Gold","Green","Grey","Magenta","Orange","Pink","Purple","Red","Teal","Yellow"]
    const pattern_traits = ["None","Square MP","Banana","Gucci","LV","Camo","Cheetah","Gold Coin","Honeycomb"]
    const fur_traits = ["Black","Blue","Brown","Cheetah","Gray","Green","Pink","Rainbow","Red","White","Zebra","Orange","Purple","Magenta"]
    const skin_traits = ["Blue","Brown","Gold","Gray","Green","Pink","Purple","Silver","Tan","White"]
    const shirt_traits = ["Logo Jacket","Cheetah Shirt","Gold Foil Jacket","Silver Foil Jacket","White Fur","Puffer Jacket",
                    "Camo Jacket","Peacoat","Track Jacket","Bomber","Retro Jackreet","Leather","Suit","Blue Jersey","Astronaut Jacket",
                    "Turtleneck","Kimono ","Sweater vest","Camo Hoodie","Denim Jacket","Acid Wash","White MP Logo Shirt",
                    "Black Primates Shirt","Black Primates Hoodie","Blue Varsity Jacket","Winter Coat","Purple Varsity Jacket",
                    "Red Varsity Jacket","Purple Jersey","Red Jersey"]
    const headwear_traits = ["No Headwear","Horns","Halo","Crown","Fedora","Black Baggy Beanie","Maroon Baggy Beanie",
                    "Forest Green Baggy Beanie","Tan Baggy Beanie","Dark Brown Baggy Beanie","Heather Gray Baggy Beanie",
                    "Blue Logo Snapback","Black Snapback","Red Snapback","Green Snapback","Grey Snapback","White Snapback",
                    "Brownb Snapback","Blue Backward Logo Snapback","Black Backwards Snapback","Red Backwards Snapback",
                    "Green Backwards Snapback","Grey Backwards Snapback","White Backwards Snapback","Brown Backwards Snapback",
                    "Deep Fedora","Blue Blank Hat","Camo Blank Hat","Cheetah Blank Hat","Yellow rolled beanie","Black rolled beanie",
                    "White rolled beanie","Gucci Bucket","Panama Black","Newsboy","Green Bass Pro Shop","Black Bass Pro Shop",
                    "Brown Bass Pro Shop","Cowboy"]
    const facialexpression_traits = ["Grin","Happy","Neutral"]
    const eye_traits = ["Bitcoin","Black","Blue","Brown","Crossed","Green","Money","Stone","Ethereum","Stoned"]
    const eyewear_traits = ["No Eye Accessory","Octagon","Hearts","Aviator","Rounded","Wayfarer","Readers","Squared"]
    const neck_traits = ["No Neck Accessory","Gold","Silver","Diamond","Gold MP","Gold Link","Dollar Sign","Silver Link","Bitcoin",
                   "Green Sling Bag","Red Sling Bag","Black Sling Bag"]
                   

app.use(express.json())
app.use(cors())

let settings = { method: "Get" };

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connection
try {
    console.log(process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI)
    console.log("connection success!")
} catch(err){
    console.log(err)
}

app.post("/traits", async (req,res)=>{
    const {cid,count} = req.body
    await read(cid,count)
    res.send("finished")
})

app.post("/rarity",async (req,res)=>{
    const {cid,count} = req.body
    let scores = await rarity(cid,count)
    res.send(scores)
})

const rarity = async (cid,count)=>{
    const address = await dataSchema.find();
    let BACKGROUND = address[0].BACKGROUND.split(',')
    let PATTERN = address[0].PATTERN.split(',')
    let FUR = address[0].FUR.split(',')
    let SKIN = address[0].SKIN.split(',')
    let SHIRTS = address[0].SHIRTS.split(',')
    let HEADWEAR = address[0].HEADWEAR.split(',')
    let FACIAL = address[0].FACIAL.split(',')
    let EYES = address[0].EYES.split(',')
    let EYEWEAR = address[0].EYEWEAR.split(',')
    let score = [];
    let raritydata = await RaritySchema.deleteMany()
    for(i=1;i<=count;i++){
        await fetch(`https://whales.mypinata.cloud/ipfs/${cid}/${i}.json`,settings)
            .then(res => res.json())
            .then(async (json) => {
                let rarityscore = 1 / (BACKGROUND[background_traits.indexOf(json.attributes[0].value)]/8888) +
                1 / (PATTERN[pattern_traits.indexOf(json.attributes[1].value)]/8888) +
                1 / ( FUR[fur_traits.indexOf(json.attributes[2].value)]/8888) +
                1 / (SKIN[skin_traits.indexOf(json.attributes[3].value)]/8888) +
                1 / (SHIRTS[shirt_traits.indexOf(json.attributes[4].value)]/8888) +
                1 / (HEADWEAR[headwear_traits.indexOf(json.attributes[5].value)]/8888) +
                1 / (FACIAL[facialexpression_traits.indexOf(json.attributes[6].value)]/8888) +
                1 / (EYES[eye_traits.indexOf(json.attributes[7].value)]/8888) +
                1 / (EYEWEAR[eyewear_traits.indexOf(json.attributes[8].value)]/8888)
                score.push(parseInt(rarityscore))
                
            });
    }
    console.log(score)
    raritydata = new RaritySchema({score:score.join(',')})
    await raritydata.save()
    return score;
}

const read = async (cid,count)=>{
    background =Array(background_traits.length).fill(0)
    pattern=Array(pattern_traits.length).fill(0)
    fur =Array(fur_traits.length).fill(0)
    skin=Array(skin_traits.length).fill(0)
    shirts =Array(shirt_traits.length).fill(0)
    head=Array(headwear_traits.length).fill(0)
    facial =Array(facialexpression_traits.length).fill(0)
    eyes=Array(eye_traits.length).fill(0)
    eyewear =Array(eyewear_traits.length).fill(0)
    neck =Array(neck_traits.length).fill(0)
    console.log(neck)

    for(i=1;i<=count;i++){
        await fetch(`https://whales.mypinata.cloud/ipfs/${cid}/${i}.json`,settings)
            .then(res => res.json())
            .then((json) => {
                    console.log(json.attributes)
                    background[background_traits.indexOf(json.attributes[0].value)]++
                    pattern[pattern_traits.indexOf(json.attributes[1].value)]++
                    fur[fur_traits.indexOf(json.attributes[2].value)]++
                    skin[skin_traits.indexOf(json.attributes[3].value)]++
                    shirts[shirt_traits.indexOf(json.attributes[4].value)]++
                    head[headwear_traits.indexOf(json.attributes[5].value)]++
                    facial[facialexpression_traits.indexOf(json.attributes[6].value)]++
                    eyes[eye_traits.indexOf(json.attributes[7].value)]++
                    eyewear[eyewear_traits.indexOf(json.attributes[8].value)]++
                    
                // do something with JSON
            });
            
    }
    let strin = background.join(',')
    console.log(strin,typeof(strin))
    let address = await dataSchema.deleteMany()
    address = new dataSchema({
                            BACKGROUND:background.join(','),
                            PATTERN:pattern.join(','),
                            FUR:fur.join(','),
                            SKIN:skin.join(','),
                            SHIRTS:shirts.join(','),
                            HEADWEAR:head.join(','),
                            FACIAL:facial.join(','),
                            EYES:eyes.join(','),
                            EYEWEAR:eyewear.join(',')
                        })
    await address.save()
}

app.get('/traits',async(req,res)=>{
    const address = await dataSchema.find();
    res.send(address[0])
})

app.get('/rarity',async (req,res)=>{
    let raritydata = await RaritySchema.find()
    res.send(raritydata[0].score.split(','))
})


app.listen(process.env.PORT ||10001,()=>console.log("Listening 10001"))