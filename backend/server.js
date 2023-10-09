const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')

app.use((req, res) => {
    console.log(req.method, req.path)
    next()
})

app.get('/', (req, res) => {
    
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})