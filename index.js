import express from "express";
import meetUpRouter from "./routes/meetup.router.js"
import fs from 'fs'
import SwaggerUi from "swagger-ui-express";

import * as dotenv from 'dotenv';

dotenv.config();


const app = express();
const port = process.env.port || 8080

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'))


app.use(express.json())
app.use('/api-doc', SwaggerUi.serve, SwaggerUi.setup(swaggerFile))
app.use('/api', meetUpRouter)

app.listen(port, () => {
    console.log(`server start on port: ${port}`)
})


