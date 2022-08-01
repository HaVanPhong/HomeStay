const db= require("../models")
const ErrorResponse= require("../helpers/ErrorResponse")
const {Op} =require("sequelize")
const { manager } = require("../models")
const Room= db.room
const Destionation= db.destination

module.exports= {
  getAll: async(req, res, next)=>{
    let rooms= await Room.findAll({include: ['manager', "destination"]})
    return res.status(200).json(rooms)
  },
  createRoom: async(req, res, next)=>{
    let {...body}= req.body
    let checkRoom= await Room.findOne({
      where: {
        id_user: body.id_user
      }
    })
    if (checkRoom){
      throw new ErrorResponse("Staff đã có nhiệm vụ quản lý homestay khác", 401)
    }
    let room= await Room.create(body)
    return res.status(201).json(room)
  },
  updateRoom: async(req, res, next)=>{
    let id= req.params.id;
    let {...body}= req.body
    let room= await Room.findByPk(id)
    if (!room){
      throw new ErrorResponse("Không tìm thấy homestay", 404)
    }
    await room.update(body)
    return res.status(200).json(room)
  },
  deleteRoom: async(req, res, next)=>{
    let id= req.params.id
    let r= await Room.findByPk(id)
    if (!r){
      throw new ErrorResponse("Không tìm thấy homestay", 404)
    }
    await r.destroy()
    return res.status(200).json(r)
  },
  getRoomById: async(req, res, next)=>{
    let id= req.params.id
    let room= await Room.findByPk(id, {
      include: ['manager', "destination"]
    })
    return res.status(200).json(room)
  },
  searchRoomByLocationName: async(req, res, next)=>{
    let lname= req.params.lname;
    let rooms= await Room.findAll({
      include: ["manager", {
        model: db.destination,
        as: "destination",
        where: {
          name_location: {
            [Op.like]: '%'+lname+'%'
          }
        },
        required: true
      }]
    })

    return res.status(200).json(rooms)
  },
  getRoomByUser: async(req, res, next)=>{
    let idUser= req.params.id_user
    let room= await Room.findOne({
      where: {
        id_user: idUser
      },
      include: ['manager', 'destination']
    })
    if (!room){
      return res.status(200).json({})
    }else {
      return res.status(200).json(room)
    }
  }
}