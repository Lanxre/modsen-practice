import { Router } from "express";
import { createValidator } from 'express-joi-validation'
import { MeetUpSchema, MeetUpIdSchema } from "../schems/meetUp.schema.js";

import MeetUpController from "../controllers/meetup.controller.js";


const router = Router();
const meetupController = new MeetUpController();
const validator = createValidator()


router.post('/meet-up',
            validator.body(MeetUpSchema),
            meetupController.createMeet.bind(meetupController));

router.get('/meet-up', 
            meetupController.getMeets.bind(meetupController));

router.get('/meet-up/:id', 
            validator.params(MeetUpIdSchema),
            meetupController.getOneMeet.bind(meetupController));

router.put('/meet-up/:id',
            validator.params(MeetUpIdSchema),
            validator.body(MeetUpSchema),
            meetupController.updateMeet.bind(meetupController));

router.delete('/meet-up/:id',
            validator.params(MeetUpIdSchema),
            meetupController.deleteMeet.bind(meetupController));


export default router;