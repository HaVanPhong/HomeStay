const dbConfig= require("../configs/config").DB

const {Sequelize, DataTypes}= require("sequelize")

const sequelize= new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAlisases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    logging: false
  }
)

sequelize.authenticate()
.then(()=>{
  console.log("Connected...")
})
.catch(err=> {
  console.log("Connect Error: "+ err)
})

const db={}
db.Sequelize= Sequelize
db.sequelize= sequelize

db.manager= require("./managerModel")(sequelize, DataTypes)
db.destination= require("./destinationModel")(sequelize, DataTypes)
db.room= require("./roomModel")(sequelize, DataTypes)
db.service= require("./serviceModel")(sequelize, DataTypes)
db.statistical= require("./statisticalModel")(sequelize, DataTypes)
db.customer= require("../models/customerModel")(sequelize, DataTypes)


db.sequelize.sync({force: false})
.then(()=>{
  console.log("yes resync done")
})

// relationship
db.manager.hasMany(db.room, {
  foreignKey: "id_user",
  as: "room"
})
db.room.belongsTo(db.manager, {
  foreignKey: "id_user",
  as: "manager",
  onDelete: "cascade"
})


db.destination.hasMany(db.room, {
  foreignKey: "id_location",
  as: "room"
})
db.room.belongsTo(db.destination, {
  foreignKey: "id_location",
  as: "destination",
  onDelete: "cascade"
})


db.room.hasMany(db.statistical, {
  foreignKey: "id_room",
  as: "statistical"
})
db.statistical.belongsTo(db.room, {
  foreignKey: "id_room",
  as: "room",
  onDelete: "cascade"
})


db.service.hasMany(db.statistical, {
  foreignKey: "id_service",
  as: "statistical"
})
db.statistical.belongsTo(db.service, {
  foreignKey: "id_service",
  as: "service",
  onDelete: "cascade"
})


db.customer.hasMany(db.statistical, {
  foreignKey: "id_customer",
  as: "statistical"
})
db.statistical.belongsTo(db.customer, {
  foreignKey: "id_customer",
  as: "customer",
  onDelete: "cascade"
})


module.exports= db