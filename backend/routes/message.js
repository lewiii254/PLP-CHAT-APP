import { Router } from "express";
const router = Router();
import Message from "../models/Message.js";

//Get All Messages
router.get("/", async (req, res) => {
    try{
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    }catch (error){
        res.status(500).json({ error: "Server Error" });
    }
});

//Save a new message
router.post("/", async(req, res)=> {
    try{
        const { text } = req.body;
        const newMessage = new Message({ text });
        await newMessage.save();
        res.status(201).json(newMessage);
    }catch (error){
        res.status(500).json({ error: "Could Not save message"});
    }
});

export default router;