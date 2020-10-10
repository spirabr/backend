const express = require('express')
const app = express()
const port = 3000

const { mongoMiddleware } = require('./mongoConnection')

app.get('/', mongoMiddleware, async (req, res) => {
  const response = await req.dbConnection.collection('users').findOne({ userId: 0 })
  res.json(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
