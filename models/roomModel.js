module.exports= (sequelize, DataTypes)=>{
  const Room= sequelize.define("room", {
    type_of_room: {
      type: DataTypes.STRING,
      allowNull: false
    },
    max_people: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost_per_day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    other_information: {
      type: DataTypes.STRING
    },
    isFree: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  })

  return Room
}