const express= require("express");
const router= express.Router();
const asyncHandle= require("../middlewares/asyncHandle");

const {
  getAll,
  getStatisticalOfRoom,
  createStatistical,
  deleteStatistical
}= require("../controllers/statistical.controller")

router
  .route("")
  .get(asyncHandle(getAll))
  .post(asyncHandle(createStatistical))

router
  .route("/:id")
  .get(asyncHandle(getStatisticalOfRoom))  
  .delete(asyncHandle(deleteStatistical))
module.exports= router;