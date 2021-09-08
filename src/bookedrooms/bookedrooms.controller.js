const Joi = require('joi');
const bookRoom = require('./bookedrooms.model')

const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    date: Joi.string().required(),
    noOfRooms: Joi.number().required()
})

exports.BookRoomController = async(req, res) => {
    try{
        const result = userSchema.validate(req.body);
        if(result.error){
            return res.status(400).json({
                error: true,
                status: 400,
                message: result.error.message,
            })
        }
        const newUser = new bookRoom(result.value);
    await newUser.save();
    return res.status(200).json({
        success: true,
        message: "Hotel Booked",
      });
    }
    catch (error) {
        console.error("signup-error", error);
        return res.status(500).json({
          error: true,
          message: "Cannot Register",
        });
      }
}