import express from 'express'
import globalErrorHandler from './middlewares/globalErrrorHandler'
import noteRoute from './note/noteRouter'
import cors from 'cors'
import envConfig from './config/config'

const app=express()

app.use(express.json())
app.use(cors({
    origin:envConfig.frontendUrl
}))
app.use(express.static('./src/uploads/'))
app.use("/api/notes",noteRoute)
app.use(globalErrorHandler)
export default app