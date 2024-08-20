import express from "express"
import exphbs from "express-handlebars"
import Handlebars from "handlebars"
import session from "express-session"
import sessionFileStore from "session-file-store"
import flash from "express-flash"

// Conexão com banco de dados
import conn from "./db/conn.mjs"

import path from "path"
import os from "os"

// Inicializando o Express

const app = express()

// Models

import Incident from "./models/Incident.mjs"
import User from "./models/User.mjs"

// Routes
import incidentsRoutes from './routes/incidentsRoutes.mjs'
import authRoutes from './routes/authRoutes.mjs'

// Controllers
import IncidentsControler from "./controllers/IncidentsController.mjs"

// Para corrigir o problema de usar o import ao invés do require na criação da ssession midware
const FileStore = sessionFileStore(session);

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receber resposta pelo body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// session midware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            //path: require('path').join(require('os').tmpdir(), 'sessions'),
            path: path.join(os.tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {

    if(req.session.userid) {
        res.locals.session = req.session
    }
    
    next()
})

// Routes
app.use('/incidents', incidentsRoutes)
app.use('/', authRoutes)

app.get('/', IncidentsControler.showIncidents)

conn
    //.sync({force : true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((error) => console.log(error))