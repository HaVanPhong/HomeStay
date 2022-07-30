const express= require("express")
const router= express.Router()

const asyncHandle= require("../middlewares/asyncHandle")

const {
  getAll
}= require("../controllers/customerContrl")

router
  .route("/")
  .get(asyncHandle(getAll))

module.exports= router