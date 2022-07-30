const db= require("../models")

const Statistical= db.statistical
const Room= db.room
const Customer= db.customer

const sendMail= require("../helpers/SendMail")
const ErrorResponse= require("../helpers/ErrorResponse")

module.exports= {
  getAll: async(req, res, next)=>{
    let statistical= await Statistical.findAll({
      where: {
        confirm: "1"
      },
      include: [
        "customer",
        "service",
        {
          model: db.room,
          as: "room",
          include: ['destination']
        }
      ]
    })
    return res.status(200).json(statistical)
  },
  getStatisticalOfRoom: async(req, res, next)=>{
    let id_room= req.params.id;
    let statistical= await Statistical.findAll({
      include: ["customer", {
        model: db.room,
        as: "room",
        where: {
          id: id_room
        },
        include: ['destination']
      }]
    })
    return res.status(200).json(statistical)
  },
  createStatistical: async(req, res, next)=>{
    let {...body}= req.body
    if (!body.total){
      throw new ErrorResponse("Total must be provide")
    }
    let idRoom= body.id_room;
    if (!idRoom){
      throw new ErrorResponse("id_room must be provide")
    }

    let checkRoom= await Room.findByPk(idRoom);

    if (!checkRoom){
      throw new ErrorResponse("Không tìm thấy room", 404)
    }
    
    if (checkRoom.isFree===0){
      throw new ErrorResponse("Phòng này đã có người đặt", 401)
    }
    await checkRoom.update({
      idFree: 0
    })

    let customer= await Customer.findOne({
      where: {
        email: body.email
      }
    })
    if (!customer){
      customer= {}
      customer.fullname= body.fullname;
      customer.age= body.age;
      customer.gender= body.gender;
      customer.phone= body.phone;
      customer.email= body.email;
      customer.address= body.address;
      customer= await Customer.create(customer);
    }

    //.. 
    let stttc= {
      total: body.total,
      id_customer: customer.id
    }
    if (body.id_room){
      stttc.id_room= body.id_room
    }
    if (body.id_service){
      stttc.id_service= body.id_service
    }
    let otp= Math.floor(Math.random()*10)+""+ Math.floor(Math.random()*10)+ ""+ Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10) ;

    stttc.confirm= otp;
    let statistical= await Statistical.create(stttc);
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    let option= {
      email: customer.email,
      subject: "THÔNG BÁO ĐẶT DỊCH VỤ THÀNH CÔNG",
      html: `<h1>Xin chân trọng thông báo, quý khách đã đặt dịch vụ homestay thành công vào thời gian ${dateTime}, Vui lòng chuẩn bị số tiền: ${body.total} $. Để xác thực thông tin. Hãy nhập mã xác nhận sau ${otp}</h1>`
    }
    await sendMail(option);

    return res.status(201).json(statistical);   
  },
  deleteStatistical: async(req, res, next)=>{
    let id= req.params.id;
    let st= await Statistical.findByPk(id);
    if (!st){
      throw new ErrorResponse("Không tìm thấy thống kê này", 404)
    }
    await st.destroy()
    return res.status(200).json(st);
  },
  confirmBooking: async (req, res, next)=>{
    let idStatistical= req.params.id;
    let otp= req.params.otp;

    if (!otp){
      throw new ErrorResponse("OTP must provide", 403);
    }

    let stt= await Statistical.findOne({ where: {
      id: idStatistical, 
      confirm: otp
    }})
    if (!stt){
      throw new ErrorResponse("OTP hoặc id statistical sai", 404);
    }

    let body={
      confirm: "1"
    }
    let result= await stt.update(body);
    if (!result){
      throw new ErrorResponse("Not found statistical. Check id statistical. Please", 404);
    }
    return res.status(200).json(result);
  },
  checkInCheckOut: async (req, res, next)=>{
    let idStatistical= req.params.id;
    let {...body}= req.body;
    let timeOut= body.timeLeave;
    if (timeOut){
      let st= await Statistical.findByPk(idStatistical);
      let idRoom= st.id_room;
      await Room.update({isFree: 1}, {
        where: {
          id: idRoom
        }
      })
    }
    let result= await Statistical.update(body, {
      where: {
        id: idStatistical
      }
    });
    if (!result){
      throw new ErrorResponse(404, "Not found statistical. Check id statistical. Please");
    }
    return res.status(200).json(result);
  }

}