const express= require("express")
const router= express.Router()
const asyncHanle= require("../middlewares/asyncHandle")
const {
  getAll,
  createManager,
  login,
  updateManage,
  getManageById,
  deleteManagerById
}= require("../controllers/managerContrl")

router
  .route("/")
  .get(asyncHanle(getAll))
  .post(asyncHanle(createManager))

router    
  .route("/login")
  .post(asyncHanle(login))  

router
  .route("/:id")
  .patch(asyncHanle(updateManage))  
  .get(asyncHanle(getManageById))
  .delete(asyncHanle(deleteManagerById))


module.exports= router  