import { Router } from "express";
import { createValidator } from 'express-joi-validation'
import { MeetUpSchema, MeetUpIdSchema } from "../schems/meetUp.schema.js";
import { requireAuth, requireAdmin } from "../auth/passport.js";

import MeetUpController from "../controllers/meetup.controller.js";


const router = Router();
const meetupController = new MeetUpController();
const validator = createValidator()

router.post('/meet-up',
            requireAuth,
            requireAdmin,
            validator.body(MeetUpSchema),
            meetupController.createMeet.bind(meetupController));

router.get('/meet-up',
            requireAuth,
            meetupController.getMeets.bind(meetupController));

router.get('/meet-up/:id',
            requireAuth, 
            validator.params(MeetUpIdSchema),
            meetupController.getOneMeet.bind(meetupController));

router.put('/meet-up/:id',
            requireAuth,
            requireAdmin,
            validator.params(MeetUpIdSchema),
            validator.body(MeetUpSchema),
            meetupController.updateMeet.bind(meetupController));

router.delete('/meet-up/:id',
            requireAuth,
            requireAdmin,
            validator.params(MeetUpIdSchema),
            meetupController.deleteMeet.bind(meetupController));


export default router;