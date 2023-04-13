import { createContainer, asClass } from 'awilix'

import MeetUpService from "../services/meetup.service.js"
import UserService from '../services/user.service.js'; 
import GoogleCalendarService from '../services/calendar.service.js';

import MeetUpController from "../controllers/meetup.controller.js";
import UserController from '../controllers/user.controller.js';

const container = createContainer();
container.register({
  meetupService: asClass(MeetUpService),
  userService: asClass(UserService),
  googleCalendarSevice: asClass(GoogleCalendarService),

  meetupController: asClass(MeetUpController),
  userController: asClass(UserController)
});


export default container;