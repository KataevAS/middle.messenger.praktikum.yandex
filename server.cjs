const express = require('express')

const app = express()
const PORT = 3000

app.use(express.static(`${__dirname}/dist/`))

app.get('/', (req, res) => {
  res.status().send(200)
})

app.listen(PORT, function () {
  console.log(`Server on port: ${PORT}!`)
})
