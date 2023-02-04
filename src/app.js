
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs')
const port = 8080;
const register = require('./model/registers')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
require('./db/conn')




//path
const staticPath = path.join(__dirname, "../public/assets/css");

const tempLetPath = path.join(__dirname, '../templets/views')

const partialsPath = path.join(__dirname, '../templets/particles')



app.use(express.static(staticPath))
app.set("view engine", "hbs");
app.set("views", tempLetPath);
hbs.registerPartials(partialsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/details', auth, (req, res) => {
    res.render('details');
})
app.get('/login', (req, res) => {
    res.render('login')
})

//inseet data


app.post('/register', async (req, res) => {
    try {
        const infoData = new register({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            age: req.body.age,

            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });

        const token = await infoData.genrateAuthToken();
        console.log("token details...", token);

        res.cookie("registration", token, { expires: new Date(Date.now() + 500000), httpOnly: true });

        const result = await infoData.save();
        console.log("all details..", result);



        res.status(201).render("login")
    } catch (error) {
        console.log(error)
    }
})


app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log("email", email);
        console.log("password", password);

        const userInfo = await register.findOne({ email: email })


        const passCop = await bcrypt.compare(password, userInfo.password)
        console.log(passCop);


        const token = await userInfo.genrateAuthToken();
        console.log("token details.login..", token);
        res.cookie("LoginCookie", token, { expires: new Date(Date.now() + 500000), httpOnly: true })

        if (passCop == true) {
            res.status(201).render('details', {
                // TitleOfWeb: [`${userInfo.firstname}
                // ${userInfo.lastname}`]
                TitleOfWeb: userInfo



            })
        } else {
            res.send("wrong ")
        }
    } catch (error) {

    }
})




app.listen(port, () => console.log(`Server Runing on port ${port}!`))