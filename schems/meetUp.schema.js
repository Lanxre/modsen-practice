import Joi from "joi";


export const MeetUpSchema = Joi.object({
    theme_meet: Joi.string()
        .min(1)
        .max(50)
        .required(),
    
    description_meet: Joi.string()
        .min(1)
        .max(150)
        .required(),
    
    tags: Joi.string()
        .min(1)
        .max(100)
        .required(),
    
    locate_meet: Joi.string()
        .min(1)
        .max(50)
        .pattern(/^\d{2}.\d{2}.\d{4}\/.+$/)
        .required()
})

export const MeetUpIdSchema = Joi.object({
    id: Joi.number().required()
})