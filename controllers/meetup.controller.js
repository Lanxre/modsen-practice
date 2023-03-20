import db from "../database/db.js"

export default class MeetUpController{
    async createMeet(req, res){
        const {
            theme_meet,
            description_meet,
            tags,
            locate_meet
        } = req.body
        
        const meetUp = await db.query(
            `INSERT INTO meetup (theme_meet, description_meet, tags, locate_meet) ` +
            `values ($1, $2, $3, $4) RETURNING *`,
            [theme_meet, description_meet, tags, locate_meet]
        )
        res.json(await meetUp.rows[0])
    }
    async getMeet(req, res){
        const meetUps = await db.query(`SELECT * FROM meetup`)
        res.json(meetUps.rows)
    }
    async getOneMeet(req, res){
        const id = req.params.id
        const meetUps = await db.query(`SELECT * FROM meetup where id = $1`, [id])
        res.json(meetUps.rows[0])
    }
    async updateMeet(req, res){
        const id = req.params.id
        const {
            theme_meet,
            description_meet,
            tags,
            locate_meet
        } = req.body

        const meetUp = await db.query(
            'UPDATE meetups set theme_meet = $1, description_meet = $2, tags = $3, locate_meet = $4 ' +
            'where id = $5 RETURNING *',
            [theme_meet, description_meet, tags, locate_meet, id]
        )
        res.json(meetUp.rows[0])
    }
    async deleteMeet(req, res){
        const id = req.params.id
        const meetUp = await db.query(
            'DELETE FROM meetup where id = $1',
            [id]
        )
        res.json(meetUp.rows[0])
    }

}
