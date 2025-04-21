const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./models/db')

const HireRouter = require('./routes/HireMeRoutes')
const PORT = process.env.PORT || 5000

// Middleware to parse JSON requests
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send("Hello From the server")
});

app.use('/HireMe', HireRouter);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} 👍`)
});
