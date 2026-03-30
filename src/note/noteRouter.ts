import express from "express"
import { createNote } from "./noteController"
import {multer,storage} from "./../middlewares/multerMiddleware"

const noteRoute=express.Router()
const upload=multer({storage:storage})
noteRoute.route("/").post(upload.single('file'),createNote)


export default noteRoute