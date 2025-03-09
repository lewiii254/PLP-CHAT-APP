import "dotenv/config.js";
import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { connect } from "mongoose";
import cors from "cors";
import MessageRoutes from "./routes/message.js";
import Message from "./models/Message.js";


//Initialize Express
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

//Middleware
app.use(cors());
app.use(json());
app.use("/api/messages", MessageRoutes);

//Connect to MongoDB
connect(process.env.MONGO_URI, {
    usenewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log("MongoDB Database Connected"))
.catch(err => console.error("MongoDB Error:", err));


//Handle Socet io Connections
io.on("connection", (socket)=> {
    console.log(`connected: ${socket.id}`);

    socket.on("message", async(msg)=>{
        console.log(`Message received: ${msg}`);

        const savedMessage = new Message({ text: msg });
        await savedMessage.save();

        io.emit("message", savedMessage);
    });

    socket.on("disconnect", ()=> {
        console.log(`sockets disconnected: ${socket.id}`);
    });
});

//Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));