import joi from 'joi';

// user_id:string
//     user_name:string
//     user_email:string
//     user_password:string


export const registrationSchema=joi.object({
    user_name:joi.string().required().min(5),
    user_email:joi.string().email().required(),
    user_password:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))
    .required()


})