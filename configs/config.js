module.exports= {
  DB: {
    HOST: "localhost",
    PORT: "3306",
    USER: "root",
    PASSWORD: "",
    DB: "democrud",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  },
  USER_ADMIN: {
    username: "admin",
    password: "admin",
    role: "admin",
    more_detail: "default admin"
  },
  gmail: {
    USER: "phonghv006@gmail.com",
    PASS: "glhvmmxircuzfkty"
  }
}