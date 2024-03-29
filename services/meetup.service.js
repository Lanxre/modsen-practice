import db from "../database/db.js"
import MeetUp from "../models/meetup.model.js";
import RegisterMeetUp from "../models/reg.meetup.model.js";

export default class MeetUpService{
    
    fields = ['theme_meet', 'description_meet', 'tags', 'locate_meet'];

    /**
     * A Method designed to store data in a database
     * @param {MeetUpDTO} meetUpDto - Dto
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

        return this.validateMeetUp(meetUps.rows[0]);
    }

    /**
     * The method is intended for updating data in the database
     * @param {MeetUpDTO} meetUpDto - Dto
     * @returns {MeetUp | null} - Returns the object if it was successfully updated
     */

    async updateMeetUp(meetUpDto){

        const sql = `UPDATE meetup set ${this.fields.map((meet, index) => `${meet} = $${index+1}`).join(', ')} ` +
        'where id = $5 RETURNING *';

        const meetUpResult = await db.query(sql,
            [meetUpDto.theme_meet, meetUpDto.description_meet, meetUpDto.tags, meetUpDto.locate_meet, meetUpDto.id]
        );

        return this.validateMeetUp(meetUpResult.rows[0]);
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
        return this.validateMeetUp(meetUpResult.rows[0]);
    }

    /**
     * A method that allows you to paggination an array by params
     * @param {object} paginationOption - Options that store the following parameters
     * @param {number} page - The number of the page from which the data is returned
     * @param {number} limit - The maximum number of records that can be
     * @returns {object} An object that stores a list of data divided into two parameters
     */

    async pagination(page, limit){
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

    /**
     * A method that allows you to sort an array by params
     * @param {Array.<MeetUp>} meetUps - Not sorted array
     * @param {object} sortOption - Sort paramas {id, theme_meet, description_meet...}
     * @returns {Array.<MeetUp>} - Sorted array
     */

    async sort(meetUps, sortOption){

        const sortFunctions = {
            id: (a, b) => a.id - b.id,
            theme_meet: (a, b) => (a.theme_meet > b.theme_meet ? 1 : -1),
            description_meet: (a, b) => (a.description_meet > b.description_meet ? 1 : -1),
            tags: (a, b) => (a.tags > b.tags ? 1 : -1),
            locate_meet: (a, b) => (a.locate_meet > b.locate_meet ? 1 : -1),
        }

        return meetUps.sort(sortFunctions[sortOption]);
    }

    /**
     * A method that allows you to filter an array by params
     * @param {Array.<MeetUp>} meetUps - Not filtered array
     * @param {object} filterOption - Filter paramas {id, theme_meet, description_meet...}
     * @returns {Array.<MeetUp>} - Sampling from an array
     */

    async filter(meetUps, filterOption){

        const filterFunctions = {
            theme_meet: (meet) => meet.theme_meet.toLowerCase().includes(filterOption.filter_value.toLowerCase()),
            description_meet: (meet) => meet.description_meet.toLowerCase().includes(filterOption.filter_value.toLowerCase()),
            tags: (meet) => meet.tags.toLowerCase().includes(filterOption.filter_value.toLowerCase()),
            locate_meet: (meet) => meet.locate_meet.toLowerCase().includes(filterOption.filter_value.toLowerCase()),
        };

        return meetUps.filter(filterFunctions[filterOption.filter_name]);
    }

    /**
     * A method that allows you to check the correctness of the data
     * @param {object} meetUpResult - Data from the database
     * @returns {MeetUp} - New MeetUp object
     */

    async validateMeetUp(meetUpResult){
        try {
            if (!meetUpResult) {
                throw new Error("Invalid ID");
            }
            return new MeetUp(meetUpResult);
        } catch (error) {
            return {
                message: error.message,
            };
        }
    }

    /**
     * A Method designed to store data in a database
     * @param {object} registerData
     * @returns {RegisterMeetUp | null} If the object was created, it will return successfully
     */
    async registerToMeetUp(registerData){

        const sql = `INSERT INTO register_to_meetup (user_id, meet_id) ` +
        `values ($1, $2) RETURNING *`;

        const registerResult = await db.query(sql,
            [registerData.userId, registerData.meetUpId]
        );

        return new RegisterMeetUp(registerResult.rows[0]);
    }

    /**
     * A method that verifies meet up
     * @param {number} id - meet up id
     * @returns {boolean} - true || false
     */
    async isExistMeetUpById(id){
        const sql = `select exists(select 1 from meetup where id=$1);`;

        const result = await db.query(sql,
            [id]
        );
        
        return result.rows[0].exists;
    }
}