import fs from 'fs'
import express from "express";
import SwaggerUi from "swagger-ui-express";
import meetUpRouter from "./routes/meetup.router.js"
import userRouter from "./routes/user.router.js"
import {passport} from "./auth/passport.js"

import * as dotenv from 'dotenv';

dotenv.config();


const app = express();
const port = process.env.port || 8080;

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'));


app.use(express.json());
app.use(passport.initialize());
app.use('/api-doc', SwaggerUi.serve, SwaggerUi.setup(swaggerFile));
app.use('/api', meetUpRouter);
app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`server start on port: ${port}`);
})


