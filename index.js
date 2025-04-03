const {initializeDatabase} = require ("./db/db.connect")
const express = require("express")
const app = express()
const Event = require("./models/event.models")
app.use(express.json())
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


initializeDatabase()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch(err => {
        console.log("Database connection failed", err)
        process.exit(1)
    })

app.get("/", (req, res) => {
    res.send("Event API")
})

async function createEvent(newEvent) {
    try{
        const event = new Event(newEvent)
        const savedEvent = await event.save();
        return savedEvent;
    } catch (error){
        throw error;
    }
}

app.post("/events", async(req, res) => {
    try{
        const saveEvent = await createEvent(req.body)
        res.status(201).json({message: "Event added successfully.", event: saveEvent })
    } catch (error){
        res.status(500).json({error: "Failed to add event."})
    }
})

async function readAllEvents (){
    try{
        const allEvents = await Event.find();
        return allEvents;
    } catch (error){
        throw error;
    }
}

app.get("/events", async(req, res) => {
    try{
        const events = await readAllEvents()
        if(events.length != 0){
            res.json(events)
        } else {
            res.status(404).json({error: "Event not found"})
        }
    } catch (error){
        res.status(500).json({error: "Failed to fetch events."})
    }
})

async function readEventById(eventId){
    try{
        const event = await Event.findById(eventId)
        return event
    } catch (error){
        throw error
    }
}

app.get("/events/id/:id", async (req, res) => {
    try{
        const event = await readEventById(req.params.id)
        if(event){
            res.json(event)
        } else {
            res.status(404).json({error: "Event not found."})
        } 
    } catch (error){
        res.status(500).json({error: "Failed to fetch event."})
    }
})

const PORT  = 3000
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})