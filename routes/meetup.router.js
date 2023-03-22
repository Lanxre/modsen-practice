import { Router } from "express";
import MeetUpController from "../controllers/meetup.controller.js";

const router = Router();
const meetupController = new MeetUpController();

router.post('/meet-up', meetupController.createMeet.bind(meetupController));
router.get('/meet-up', meetupController.getMeets.bind(meetupController));
router.get('/meet-up/:id', meetupController.getOneMeet.bind(meetupController));
router.put('/meet-up/:id', meetupController.updateMeet.bind(meetupController));
router.delete('/meet-up/:id', meetupController.deleteMeet.bind(meetupController));


export default router;