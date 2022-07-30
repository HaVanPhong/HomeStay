const db= require("../models")
const ErrorResponse= require("../helpers/ErrorResponse")

const Service= db.service

module.exports= {
  getAll: async(req, res, next)=>{
    let services= await Service.findAll({})
    return res.status(200).json(services)
  },
  createService: async(req, res, next)=>{
    let {...body}= req.body
    let service= await Service.create(body)
    return res.status(201).json(service)
  },
  updateService: async(req, res, next)=>{
    let id= req.params.id
    let{...body}= req.body
    let service= await Service.findByPk(id)
    if (!service){
      throw new ErrorResponse("Không tìm thấy service", 404)
    }
    await service.update(body)
    return res.status(200).json(service)
  },
  deleteService: async(req, res, next)=>{
    let id= req.params.id
    let r= await Service.findByPk(id)
    if (!r){
      throw new ErrorResponse("Không tìm thấy service", 404)
    }
    await r.destroy()
    return res.status(200).json(r)
  },
  getServiceById: async(req, res, next)=>{
    let id= req.params.id
    let service= await Service.findByPk(id)
    if (!service){
      throw new ErrorResponse("Không tìm thấy service", 404)
    }
    return res.status(200).json(service)
  }
}