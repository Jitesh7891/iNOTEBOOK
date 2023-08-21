const express = require('express')
const app = express()
var cors=require('cors')

//express app will run on port 3000 so run this one on 5000 instead
const port = 5000

app.use(cors());

//middleware to access body json
app.use(express.json())

const connectToMongo=require('./db')
connectToMongo();


//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook - Backend app listening on port ${port}`)
})
