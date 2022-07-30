const db= require("../models")
const ErrorResponse= require("../helpers/ErrorResponse")

const Manager= db.manager

module.exports= {
  getAll: async(req, res, next)=>{
    let managers= await Manager.findAll({})
    res.status(200).json(managers)
  },
  createManager: async(req, res, next)=>{
    let {...body}= req.body
    let manager= await Manager.create(body)
    return res.status(201).json(manager)
  },
  login: async(req, res, next)=>{
    let {...body}= req.body
    let manager= await Manager.findOne({
      where: {
        username: body.username
      }
    })
    if (!manager){
      throw new ErrorResponse("Sai tài khoản", 403)
    }
    if (manager.password===body.password){
      return res.status(200).json(manager)
    }else 
      throw new ErrorResponse("sai mật khẩu", 403)
  },
  updateManage: async(req, res, next)=>{
    let id= req.params.id;
    let {...body}= req.body;
    let manager= await Manager.findByPk(id)

    if (!manager){
      throw new ErrorResponse("Không tìm thấy tài khoản", 404)
    }
    await manager.update(body)
    return res.status(200).json(manager)
  },
  getManageById: async(req, res, next)=>{
    let id= req.params.id;
    let manager= await Manager.findByPk(id)
    if (!manager){
      throw new ErrorResponse("Not found account", 404)
    }
    return res.status(200).json(manager)
  },
  deleteManagerById: async(req, res, next)=>{
    let id= req.params.id;
    let manager= await Manager.destroy({
      where: {
        id: id
      }
    })
    return res.status(200).json(manager)
  }
}