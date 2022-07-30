const managerRouter= require("./managerRouter")
const destinationRouter= require("./destinationRouter")
const roomRouter= require("./roomRouter")
const serviceRouter= require("./serviceRouter")
const statisticalRouter= require("./statisticalRouter")
const customerRouter= require("./customerRouter")

const errorHandle= require("../middlewares/errorHandle")
module.exports= (app)=>{
  app.use("/api/managers", managerRouter)
  app.use("/api/destinations", destinationRouter)
  app.use("/api/rooms", roomRouter)
  app.use("/api/services", serviceRouter)
  app.use("/api/statisticals", statisticalRouter)
  app.use("/api/customers", customerRouter)

  app.use(errorHandle);

  // not found
  app.get("*", function (req, res) {
    return res.status(404).json({
      success: false,
      data: "API not found",
    });
  });
}