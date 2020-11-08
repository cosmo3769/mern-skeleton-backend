// module needed for backend
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

//routes imported
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// import Template from './../template'

//express app initialized
const app = express()

// parse body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// request-respone for root URL for rendering template.js in browser "/"
// app.get('/', (req, res) => {
//     res.status(200).send(Template())
// })

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)

export default app