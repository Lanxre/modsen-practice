import GoogleEvent from "../models/event.google.model.js";

function getDate(){
    return new Date();
}

function getEndDate(){
    return new Date(new Date().setHours(new Date().getHours() + 1));
}

function getTimeZone(){
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export default function eventMapper(meetUp){
    return new GoogleEvent({
        summary: meetUp.theme_meet,
        description: meetUp.description_meet + '\n' + `Next tags: ${meetUp.tags}`,
        location: meetUp.locate_meet,
        start: {
            dateTime: getDate(),
            timeZone: getTimeZone()
        },
        end: {
            dateTime: getEndDate(),
            timeZone: getTimeZone()
        }
    })
}