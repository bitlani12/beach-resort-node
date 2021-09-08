const express = require('express');
const bookroomRouter = express.Router();
const BookRoom = require('../bookedrooms/bookedrooms.controller');
const cleanBody = require("../middlewares/cleanbody");
const cleanbody = require('../middlewares/cleanbody');
bookroomRouter.post('/bookroom', cleanbody, BookRoom.BookRoomController)
module.exports = bookroomRouter;