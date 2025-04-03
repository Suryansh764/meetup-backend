const mongoose = require ("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    type: {
        type: String,
        enums: [
            "Online",
            "Offline",
            "Both"
        ]
    },
    time: String,
    thumbnail: String,
    image: String,
    hostedBy: String,
    details: String,
    dressCode: String,
    ageRestrictions: String,
    eventTags: [String],
    startDate: String,
    endDate: String,
    location: String,
    price: Number,
    speakers: [
        {
            speakerName: String,
            designation: String,
            
        }
    ]

})

const Events = mongoose.model("Events", eventSchema)

module.exports = Events