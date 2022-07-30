module.exports= (sequelize, DataTypes)=>{
  const Service= sequelize.define("service", {
    name_service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    more_detail: {
      type: DataTypes.STRING
    }
  })
  return Service
}