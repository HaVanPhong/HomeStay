const express= require("express")
const router= express.Router()
const asyncHandle= require("../middlewares/asyncHandle")

const {
  getAll,
  createService,
  updateService,
  deleteService,
  getServiceById
}= require("../controllers/serviceContrl")

router 
  .route("/")
  .get(asyncHandle(getAll))
  .post(asyncHandle(createService))

router
  .route("/:id")
  .patch(asyncHandle(updateService))
  .delete(asyncHandle(deleteService))
  .get(asyncHandle(getServiceById))  


module.exports= router