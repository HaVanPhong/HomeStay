const db= require("../models")

const Customer= db.customer

module.exports= {
  getAll: async(req, res, next)=>{
    let customer= await Customer.findAll({})
    return res.status(200).json(customer)
  }
}