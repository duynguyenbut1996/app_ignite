var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
var mailer = require('express-mailer')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var multer = require('multer')

app.use(express.static('public'))

require('dotenv').config()
var AuthRouter = require('./router/admin/Auth.Router')
var AdminRouter = require('./router/admin/Admin.Router')
var Product = require('./router/users/Product.Router')
var User = require('./router/users/User.Router')
var Single = require('./router/users/Single.Router')
var Image = require('./router/users/Image.Router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

app.set('view engine', 'ejs')

// upload image originalName
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage })


// setting for mailer.
mailer.extend(app, {
    from: process.env.EMAIL_FROM,
    host: process.env.MAIL_HOST, // hostname
    secureConnection: process.env.EMAIL_SECURE, // use SSL
    port: process.env.EMAIL_PORT, // port for secure SMTP
    transportMethod: process.env.EMAIL_TRANSPORT_METHOD, // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: process.env.EMAIL_AUTH_USERNAME,
        pass: process.env.EMAIL_AUTH_PASSWORD
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/frontend/layouts/index.html');
});

app.get('/single', function (req, res) {
    res.sendFile(__dirname + '/views/frontend/layouts/single.html');
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/frontend/layouts/login.html');
});

app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/views/frontend/layouts/registered.html');
});

app.get('/create-product', function (req, res) {
    res.sendFile(__dirname + '/views/frontend/layouts/about.html');
});

app.post('/upload', upload.array('photos', 3), (req, res) => {
    res.sendFile(__dirname + '/views/frontend/layouts/about.html');
});

// load auth's router.
app.use('/auth', AuthRouter)

// admin routes.
app.use('/admin', AdminRouter)

// load product's router.
app.use('/product', Product)
app.use('/user', User)
app.use('/single', Single)
app.use('/image', Image)

// socketio server open
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on("disconnect", function () {
        console.log(socket.id + "ngat ket noi !!!!");
    })
    socket.on("client-send-price-now", (data) => {
        console.log(socket.id + "send data:", data)
        io.sockets.emit("server-send-priceNowbyId", data)
    })
});

http.listen(process.env.DB_PORT, () => {
    console.log("server running at port ", process.env.DB_PORT)
})
