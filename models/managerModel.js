module.exports= (sequelize, DataTypes)=>{
  const Manager= sequelize.define("manager", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "staff"
    },
    more_detail: {
      type: DataTypes.STRING
    }
  })

  return Manager
}