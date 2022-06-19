const express= require("express");
const asyncHandle= require("../middlewares/asyncHandle")

const {
  getServiceByRoom,
  createServiceForRoom,
  updateServiceForRoom,
  deleteService
}= require("../controllers/service.controller")
const router= express.Router();

router
  .route("")
  .post(asyncHandle(createServiceForRoom))
  

router  
  .route("/:id")
  .get(asyncHandle(getServiceByRoom))
  .delete(asyncHandle(deleteService))
  .patch(asyncHandle(updateServiceForRoom))


module.exports= router;