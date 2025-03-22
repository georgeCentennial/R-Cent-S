import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
//import devBundle from './devBundle'
import path from 'path'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()
//devBundle.compile(app)

// Middleware
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// Routes
app.get('/', (req, res) => {
  res.status(200).send(Template())
})
app.use('/', userRoutes)
app.use('/', authRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  // ... (your error handling code)
})

export default app