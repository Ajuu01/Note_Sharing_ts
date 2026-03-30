import express from 'express'
import globalErrorHandler from './middlewares/globalErrrorHandler'
import noteRoute from './note/noteRouter'

const app=express()

app.use(express.json())
app.use(express.static('./src/uploads/'))
app.use("/api/notes",noteRoute)
app.use(globalErrorHandler)
export default app