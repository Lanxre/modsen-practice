import { Router } from "express";
import MeetUpController from "../controllers/meetup.controller.js";

const router = Router();
const meetupController = new MeetUpController();

router.post('/meet-up', meetupController.createMeet);
router.get('/meet-up', meetupController.getMeet);
router.get('/meet-up/:id', meetupController.getOneMeet);
router.put('/meet-up/:id', meetupController.updateMeet);
router.delete('/meet-up/:id', meetupController.deleteMeet);


export default router;