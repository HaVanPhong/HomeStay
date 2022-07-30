module.exports= (sequelize, DataTypes)=>{
  const Statistical= sequelize.define("statistical", {
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    confirm: {
      type: DataTypes.STRING,
      defaultValue: "0"
    },
    timeCome: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    timeLeave: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  })
  return Statistical
}