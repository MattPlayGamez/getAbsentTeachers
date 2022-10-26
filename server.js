require('dotenv/config')
const express = require('express')
const app = express()
const getSite = require('./getSite.js')

app.set('view-engine', 'ejs')

app.get('/', (req, res, next) => {
    res.render('createToken.ejs')
})

app.post('/', async (req, res) => {
    await getSite() ? res.send(true) : res.send(false)
})


app.listen(80)