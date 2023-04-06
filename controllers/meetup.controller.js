import MeetUpDTO from "../dtos/meetup.dto.js"
import MeetUpService from "../services/meetup.service.js"

export default class MeetUpController {

    constructor(){
        this.service = new MeetUpService();
    }

    async createMeet(req, res){
        const meetUpDto = new MeetUpDTO(req.body);
        const meetUp = await this.service.createMeetUp(meetUpDto);
        
        res.json(meetUp);
    }

    async getMeets(req, res){
        let meetUps = this.service.getMeetUps();
        
        if(req.query.filter){
            meetUps = this.service.filter(meetUps, {
                filter_name: req.query.filter,
                filter_value: req.query.filter_value
            });
        }
        
        if(req.query.sort){
            this.service.sort(meetUps, req.query.sort);
        }
        
        if(req.query.page || req.query.limit){
            meetUps = await this.service.pagination(req.query);
        }
        
        res.json(meetUps);
    }

    async getOneMeet(req, res){
        const meetUp = await this.service.getOneMeetUp(req.params.id);

        if(meetUp.message){
            res.status(404).json(meetUp)
        }else{
            res.json(meetUp);
        }

    }

    async updateMeet(req, res){
        const meetUpDto = new MeetUpDTO({...req.body, id: req.params.id});
        const meetUpResult = await this.service.updateMeetUp(meetUpDto);
        if(meetUpResult.message){
            res.status(404).json(meetUpResult)
        }else{
            res.json(meetUpResult);
        }
    }

    async deleteMeet(req, res){
        const meetUp = await this.service.deleteMeetUp(req.params.id);

        if(meetUp.message){
            res.status(404).json(meetUp)
        }else{
            res.json(meetUp);
        }
    }

    async registerToMeetUp(req, res){
        const userId = req.user.id;
        const meetUpId = req.query.id;

        const isMeetExist = this.service.isExistMeetUpById(meetUpId)

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
