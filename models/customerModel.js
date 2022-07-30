module.exports= (sequelize, DataTypes)=>{
  const Customer= sequelize.define("customer", {
    fullname: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    }
  })
  return Customer
}