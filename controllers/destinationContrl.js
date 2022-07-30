const db= require("../models")
const ErrorResponse= require("../helpers/ErrorResponse")

const Destionation= db.destination

module.exports= {
  getAll: async(req, res, next)=>{
    let destinations= await Destionation.findAll({})
    res.status(200).json(destinations)
  },
  createDestination: async(req, res, next)=>{
    let {...body}= req.body
    let destination= await Destionation.create(body)
    return res.status(201).json(destination)
  },
  updateDestination: async(req, res, next)=>{
    let id= req.params.id;
    let {...body}= req.body

    let destination= await Destionation.findByPk(id)
    if (!destination){
      throw new ErrorResponse("Không tìm thấy khu vực", 404)
    }

    await destination.update(body)
    return res.status(200).json(destination)
  },
  deleteDestination: async(req, res, next)=>{
    let id= req.params.id
    let des= await Destionation.destroy({
      where: {
        id: id
      }
    })
    return res.status(200).json(des);
  }

}