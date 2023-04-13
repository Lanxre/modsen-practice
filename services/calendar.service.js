import { google } from 'googleapis'
import * as dotenv from 'dotenv';
import GoogleEvent from '../models/event.google.model.js';

dotenv.config();


const credentials = JSON.parse(process.env.credentials);
const calendarId = process.env.calendar_id;
const scopes =  'https://www.googleapis.com/auth/calendar';


export default class GoogleCalendarService {

    constructor() {
        this.auth = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            scopes
        );

        this.calendar = google.calendar({ version: 'v3', auth: this.auth });
      }
    
      async listEvents(timeMin, timeMax) {
        try {
          const res = await this.calendar.events.list({
            calendarId,
            timeMin,
            timeMax,
          });

          return res.data.items.map(event => GoogleEvent({
              id: event.id,
              summary: event.summary,
              description: event.description,
              location: event.location,
              start: event.start,
              end: event.end
          }));

        } catch (err) {
          console.error(`Error listing events: ${err}`);
          throw err;
        }
      }
    
      async getEvent(eventId) {
        try {

          const res = await this.calendar.events.get({
            calendarId,
            eventId,
          });
          
          return new GoogleEvent({
            id: res.data.id,
            summary: res.data.summary,
            description: res.data.description,
            location: res.data.location,
            start: res.data.start,
            end: res.data.end
          });
        } catch (err) {
          console.error(`Error getting event: ${err}`);
          throw err;
        }
      }
    
      async insertEvent(event) {
        try {

          const res = await this.calendar.events.insert({
            calendarId,
            resource: event,
          });

          return new GoogleEvent({
            id: res.data.id,
            summary: res.data.summary,
            description: res.data.description,
            location: res.data.location,
            start: res.data.start,
            end: res.data.end
          });
        } catch (err) {
          console.error(`Error inserting event: ${err}`);
          throw err;
      
        }
      }
    
      async updateEvent(eventId, event) {
        try {

          const res = await this.calendar.events.update({
            calendarId,
            eventId,
            resource: event,
          });

          return new GoogleEvent({
            id: res.data.id,
            summary: res.data.summary,
            description: res.data.description,
            location: res.data.location,
            start: res.data.start,
            end: res.data.end
          });
        } catch (err) {
          console.error(`Error updating event: ${err}`);
          throw err;
        }
      }
    
      async deleteEvent(eventId) {
        try {

          const res = await this.calendar.events.delete({
            calendarId,
            eventId,
          });

          return new GoogleEvent({
            id: res.data.id,
            summary: res.data.summary,
            description: res.data.description,
            location: res.data.location,
            start: res.data.start,
            end: res.data.end
          });
        } catch (err) {
          console.error(`Error deleting event: ${err}`);
          throw err;
        }
      }
}


