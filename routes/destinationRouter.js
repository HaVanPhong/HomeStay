const express= require("express")

const router= express.Router()

const asyncHandle= require("../middlewares/asyncHandle")
const {
  getAll,
  createDestination,
  updateDestination,
  deleteDestination
}= require("../controllers/destinationContrl")

router
  .route("/")
  .get(asyncHandle(getAll))
  .post(asyncHandle(createDestination))

router
  .route("/:id")
  .patch(asyncHandle(updateDestination))
  .delete(asyncHandle(deleteDestination))  



module.exports= router