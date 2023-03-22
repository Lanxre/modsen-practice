import db from "../database/db.js"
import MeetUpDTO from "../dtos/meetup.dto.js";
import MeetUp from "../models/meetup.model.js";

export default class MeetUpService{

    /**
     * A Method designed to store data in a database
     * @param {MeetUpDTO} meetUpDto - dto
     * @returns {MeetUp | null} If the object was created, it will return successfully
     */

    async createMeetUp(meetUpDto){
        const meetUpResult = await db.query(
            `INSERT INTO meetup (theme_meet, description_meet, tags, locate_meet) ` +
            `values ($1, $2, $3, $4) RETURNING *`,
            [meetUpDto.theme_meet, meetUpDto.description_meet, meetUpDto.tags, meetUpDto.locate_meet]
        )
        const meetUp = new MeetUp(meetUpResult.rows[0])
        
        return meetUp
    }

    /**
     * A method designed to retrieve data from a database
     * @returns {Array.<MeetUp>} Returns a list of data from the database
     */

    async getMeetUps(){
        const meetUps = await db.query(`SELECT * FROM meetup`)
        
        return meetUps.rows.map((meetUp) => new MeetUp(meetUp))
    }

    /**
     * The method is designed to get a single record from the database
     * @param {number} id - The number of the object required to receive
     * @returns {MeetUp} One record from the database is returned
     */

    async getOneMeetUp(id){
        const meetUps = await db.query(`SELECT * FROM meetup where id = $1`, [id])
        
        return new MeetUp(meetUps.rows[0])
    }

    /**
     * The method is intended for updating data in the database
     * @param {MeetUpDTO} meetUpDto - dto
     * @returns {MeetUp | null} - Returns the object if it was successfully updated
     */

    async updateMeetUp(meetUpDto){
        const meetUpResult = await db.query(
            'UPDATE meetups set theme_meet = $1, description_meet = $2, tags = $3, locate_meet = $4 ' +
            'where id = $5 RETURNING *',
            [meetUpDto.theme_meet, meetUpDto.description_meet, meetUpDto.tags, meetUpDto.locate_meet, meetUpDto.id]
        )

        return new MeetUp(meetUpResult.rows[0])
    }

    /**
     * The method is designed to delete data in the database by record number
     * @param {number} id - The number of the record to be deleted
     * @returns {MeetUp | null} - If the data is deleted successfully, the object will be returned
     */

    async deleteMeetUp(id){
        const meetUpResult = await db.query(
            'DELETE FROM meetup where id = $1',
            [id]
        )

        return new MeetUp(meetUpResult.rows[0])
    }
}