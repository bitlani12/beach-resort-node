const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookRoomSchema = new Schema(
    {
        name: {type : String, unique: false},
        date: {type: String, unique: false},
        noOfRooms: {type: String, unique: false}
    }
)

const bookRoom = mongoose.model("bookRoom", bookRoomSchema);
module.exports = bookRoom;