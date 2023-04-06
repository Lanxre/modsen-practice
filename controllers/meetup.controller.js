import MeetUpDTO from "../dtos/meetup.dto.js"
import MeetUpService from "../services/meetup.service.js"

export default class MeetUpController {

    constructor(){
        this.service = new MeetUpService();
    }

    async createMeet(req, res){
        try {
            const meetUpDto = new MeetUpDTO(req.body);
            const meetUp = await this.service.createMeetUp(meetUpDto);

            res.json(meetUp);
        }catch (error){
            res.status(500).json({ message: `Server error: ${error}` });
        }
    }

    async getMeets(req, res){
        try {
            const { filter, filter_value, sort, page, limit } = req.query;
            let meetUps = await this.service.getMeetUps();

            if (filter) {
                meetUps = await this.service.filter(meetUps, { filter_name: filter, filter_value });
            }

            if (sort) {
                await this.service.sort(meetUps, sort);
            }

            if (page || limit) {
                meetUps = await this.service.pagination(req.query);
            }

            res.json(meetUps);
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getOneMeet(req, res){
       try {
           const meetUp = await this.service.getOneMeetUp(req.params.id);
           res.json(meetUp);
       }catch (error){
           res.status(500).json({ message: `Internal server error: ${error}` });
       }

    }

    async updateMeet(req, res){
        try {
            const meetUpDto = new MeetUpDTO({...req.body, id: req.params.id});
            const updatedMeetUp = await this.service.updateMeetUp(meetUpDto);

            res.json(updatedMeetUp);
        } catch (error) {
            if (error.message) {
                res.status(422).json({message: error.message});
            } else {
                res.status(500).json({message: 'Internal server error'});
            }
        }

    }

    async deleteMeet(req, res){
        try {
            const meetUp = await this.service.deleteMeetUp(req.params.id);

            if(meetUp.message){
                res.status(404).json(meetUp)
            }else{
                res.json(meetUp);
            }

        }catch (error){
            res.status(500).json({message: error.message})
        }
    }

    async registerToMeetUp(req, res){
        const userId = req.user.id;
        const meetUpId = req.query.id;

        const isMeetExist = await this.service.isExistMeetUpById(meetUpId)

        if(!isMeetExist){
            res.status(404).json({message: 'invalid meet up id'})
        }else{
            const isRegister = await this.service.registerToMeetUp({userId: userId, meetUpId: meetUpId})
        
            if(!isRegister){
                res.status(404).json({message: 'some error'})
            }else{
                res.json(isRegister)
            }
        }
    }
}
