const express = require('express')
const app = express()
const path = require('node:path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const usersStored = []

app.get('/', (req, res) =>{
    res.render('index')
})

app.post('/subscription', (req, res) =>{
    const username = req.body.username
    const useremail = req.body.email

    usersStored.push(req.body)
    res.redirect('/concluded')
})

app.get('/concluded', (req, res) =>{

    res.render('end')
})

app.get('/admin', (req, res) =>{
    res.render('adminLogin')
})

app.post('/adminverify', (req, res) =>{
    const login = req.body.login
    const password = req.body.password
    
    if (login === 'admin123' && password === '0000'){
        res.redirect('/adminlogin')
        return;
    }
    res.redirect('/admin')
})

app.get('/adminlogin', (req, res) =>{
    res.render('admin', ({users : usersStored}))
})

app.post('/deleteUser', (req, res) =>{
    const deleteID_User = parseInt(req.body.delete) - 1
    usersStored.splice(deleteID_User, 1)

    res.redirect('/adminlogin')
})

PORT = 3000

app.listen(PORT, () =>{
    console.log('Server online')
})