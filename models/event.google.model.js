export default class GoogleEvent {

    constructor({
        id,
        summary,
        description,
        start,
        end,
    }){
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.start = start;
        this.end = end;
    }
}