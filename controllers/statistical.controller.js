const statisticalModel= require("../models/statistical.model");
const customerModel= require("../models/customer.model");
const roomModel= require("../models/room.model");
const sendMail= require("../helpers/SendMail");
const ErrorResponse= require("../helpers/ErrorResponse");

module.exports= {
  getAll: async (req, res, next)=>{
    let statisticals= await statisticalModel.find().populate("id_customer");
    return res.status(200).json(statisticals);
  },
  getStatisticalOfRoom: async (req, res, next)=>{
    let idRoom = req.params.id;
    let statisticals= await statisticalModel.find({id_room: idRoom}).populate("id_customer");
    return res.status(200).json(statisticals);
  },
  createStatistical: async(req, res, next)=>{
    let {...body}= req.body;
    
    if (!body.total){
      throw new ErrorResponse(401, "Total must provide");
    }

    let customer= await customerModel.findOne({email: body.email});
    if (!customer){
      customer= {}
      customer.fullname= body.fullname;
      customer.age= body.age;
      customer.gender= body.gender;
      customer.phone= body.phone;
      customer.email= body.email;
      customer.address= body.address;
      customer= await customerModel.create(customer);
    }
    // body.id_customer= customer._id;
    let stttc= {
      total: body.total,
      id_customer: customer._id
    }
    if (body.id_room){
      stttc.id_room= body.id_room
    }
    if (body.id_service){
      stttc.id_service= body.id_service
    }

    let statistical= await statisticalModel.create(stttc);
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    let option= {
      email: customer.email,
      subject: "THÔNG BÁO ĐẶT DỊCH VỤ THÀNH CÔNG",
      html: `<h1>Xin chân trọng thông báo, quý khách đã đặt dịch vụ homestay thành công ${dateTime}, Vui lòng chuẩn bị số tiền: ${body.total} $</h1>`
    }
    await sendMail(option);

    return res.status(201).json(statistical);    
  },
  deleteStatistical: async (req, res, next)=>{
    let id= req.params.id;
    return res.status(200).json(await statisticalModel.findByIdAndDelete(id))
  }

}