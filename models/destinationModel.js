module.exports= (sequelize, DataTypes)=>{
  const Destination = sequelize.define("destination", {
    name_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    more_detail: {
      type: DataTypes.STRING
    }
  })
  return Destination
}