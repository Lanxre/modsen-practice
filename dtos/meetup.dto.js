export default class MeetUpDTO{

    constructor({
        id,
        theme_meet,
        description_meet,
        tags,
        locate_meet
    }){
        this.id = id;
        this.theme_meet = theme_meet;
        this.description_meet = description_meet;
        this.tags = tags;
        this.locate_meet = locate_meet;
    }

};