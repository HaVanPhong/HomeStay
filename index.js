const express= require("express")
const cors= require("cors")
const app= express()
const router= require("./routes")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

router(app)


app.listen(3000, ()=>{
  console.log("Server run at port 3000")
})