import express from "express"
import { createNote, deleteNote, listNote, listNotes } from "./noteController"
import {multer,storage} from "./../middlewares/multerMiddleware"

const noteRoute=express.Router()
const upload=multer({storage:storage})
noteRoute.route("/")
.post(upload.single('file'),createNote)
.get(listNotes)

noteRoute.route("/:id")
.get(listNote)
.delete(deleteNote)


export default noteRoute