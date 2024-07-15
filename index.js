const jwt = require("jsonwebtoken") 
const express = require('express')
const app = express()
const cors = require('cors')

const { getUser, verifyCred, registerUser } = require('./server')

app.listen(3000, console.log("Servidor Encendido"))
app.use(cors())
app.use(express.json())

app.get("/user", async (req, res) => {
    try {
        const user = await getUser()
        res.json(user)
        
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        await verifyCred(email, password)
        const token = jwt.sign({ email }, "az_AZ")
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})

app.post("/registrarse", async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body
        await registerUser(email, password, rol, lenguage)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})