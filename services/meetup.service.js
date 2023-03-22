import db from "../database/db.js"
import MeetUpDTO from "../dtos/meetup.dto.js";
import MeetUp from "../models/meetup.model.js";

export default class MeetUpService{
    
    fields = ['theme_meet', 'description_meet', 'tags', 'locate_meet'];

    /**
     * A Method designed to store data in a database
     * @param {MeetUpDTO} meetUpDto - dto
     * @returns {MeetUp | null} If the object was created, it will return successfully
     */

    async createMeetUp(meetUpDto){

        const sql = `INSERT INTO meetup (${this.fields.join(', ')}) ` +
        `values ($1, $2, $3, $4) RETURNING *`;

        const meetUpResult = await db.query(sql,
            [meetUpDto.theme_meet, meetUpDto.description_meet, meetUpDto.tags, meetUpDto.locate_meet]
        );
        const meetUp = new MeetUp(meetUpResult.rows[0]);
        
        return meetUp;
    }

    /**
     * A method designed to retrieve data from a database
     * @returns {Array.<MeetUp>} Returns a list of data from the database
     */

    async getMeetUps(){
        const meetUps = await db.query(`SELECT * FROM meetup`);
        
        return meetUps.rows.map((meetUp) => new MeetUp(meetUp));
    }

    /**
     * The method is designed to get a single record from the database
     * @param {number} id - The number of the object required to receive
     * @returns {MeetUp} One record from the database is returned
     */

    async getOneMeetUp(id){
        const meetUps = await db.query(`SELECT * FROM meetup where id = $1`, [id]);
        
        return new MeetUp(meetUps.rows[0]);
    }

    /**
     * The method is intended for updating data in the database
     * @param {MeetUpDTO} meetUpDto - dto
     * @returns {MeetUp | null} - Returns the object if it was successfully updated
     */

    async updateMeetUp(meetUpDto){

        const sql = `UPDATE meetup set ${this.fields.map((meet, index) => `${meet} = $${index+1}`).join(', ')} ` +
        'where id = $5 RETURNING *';

        const meetUpResult = await db.query(sql,
            [meetUpDto.theme_meet, meetUpDto.description_meet, meetUpDto.tags, meetUpDto.locate_meet, meetUpDto.id]
        );

        return new MeetUp(meetUpResult.rows[0]);
    }

    /**
     * The method is designed to delete data in the database by record number
     * @param {number} id - The number of the record to be deleted
     * @returns {MeetUp | null} - If the data is deleted successfully, the object will be returned
     */

    async deleteMeetUp(id){
        const meetUpResult = await db.query(
            'DELETE FROM meetup where id = $1 RETURNING *',
            [id]
        );
        return new MeetUp(meetUpResult.rows[0]);
    }

    async pagination(paginationOption){
        const page = parseInt(paginationOption.page) || 1; 
        const limit = parseInt(paginationOption.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        const meetUps = await this.getMeetUps();

        if (endIndex < meetUps.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        
        
        results.meetUps = meetUps.slice(startIndex, endIndex);

        return results;
    }


    async sort(meetUps, sortOption){

        const sortFunctions = {
            id: (a, b) => a.id - b.id,
            theme_meet: (a, b) => (a.theme_meet > b.theme_meet ? 1 : -1),
            description_meet: (a, b) => (a.description_meet > b.description_meet ? 1 : -1),
            tags: (a, b) => (a.tags > b.tags ? 1 : -1),
            locate_meet: (a, b) => (a.locate_meet > b.locate_meet ? 1 : -1),
        }

        const sortedMeetUps = meetUps.sort(sortFunctions[sortOption]);

        return sortedMeetUps;
    }


    async filter(meetUps, filterOption){

        const filterFunctions = {
            theme_meet: (meet) => meet.theme_meet.toLowerCase().includes(filterOption.filter_value.toLowerCase()),
            description_meet: (meet) => meet.description_meet.toLowerCase().includes(filterOption.filter_value.toLowerCase()),
            tags: (meet) => meet.tags.toLowerCase().includes(filterOption.filter_value.toLowerCase()),
            locate_meet: (meet) => meet.locate_meet.toLowerCase().includes(filterOption.filter_value.toLowerCase()),
        }

        const filterMeetUps = meetUps.filter(filterFunctions[filterOption.filter_name]);

        return filterMeetUps;

    }
}