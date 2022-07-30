const express= require("express")
const router= express.Router()

const asyncHandle= require("../middlewares/asyncHandle")
const {
  getAll,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
  searchRoomByLocationName,
  getRoomByUser
}= require("../controllers/roomContrl")

router
  .route("/")
  .get(asyncHandle(getAll))
  .post(asyncHandle(createRoom))

router
  .route("/:id")
  .patch(asyncHandle(updateRoom))
  .delete(asyncHandle(deleteRoom))
  .get(asyncHandle(getRoomById))

router
  .route("/search/:lname")
  .get(asyncHandle(searchRoomByLocationName))

router
  .route("/user/:id_user")
  .get(asyncHandle(getRoomByUser))

  module.exports= router