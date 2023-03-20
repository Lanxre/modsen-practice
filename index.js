import express from "express";
import meetUpRouter from "./routes/meetup.router.js"
import * as dotenv from 'dotenv';

dotenv.config();


const app = express();
const port = process.env.port || 8080

app.use(express.json())
app.use('/api', meetUpRouter)

app.listen(port, () => {
    console.log(`server start on port: ${port}`)
})


