const express= require("express");
const asyncHandle= require("../middlewares/asyncHandle")

const {
  getServiceByRoom,
  createServiceForRoom,
  updateServiceForRoom,
  deleteService,
  getAllService
}= require("../controllers/service.controller");
const { getAll } = require("../controllers/room.controller");
const router= express.Router();

router
  .route("")
  .get(asyncHandle(getAllService))
  .post(asyncHandle(createServiceForRoom))
  

router  
  .route("/:id")
  .get(asyncHandle(getServiceByRoom))
  .delete(asyncHandle(deleteService))
  .patch(asyncHandle(updateServiceForRoom))


module.exports= router;