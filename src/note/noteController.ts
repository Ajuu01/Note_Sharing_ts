import { NextFunction, Request,Response } from "express"
import noteModel from "./noteModel"
import envConfig from "../config/config"
import createHttpError from "http-errors"


const createNote=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const file=req.file?`${envConfig.backendUrl}/${req.file.filename}`:"https://www.freepik.com/photos"

            const {title,subtitle,description}=req.body
            if(!title || !subtitle || !description|| title===undefined){
                res.status(400).json({
                    message:"Please provide all fields"
                })
                return
            }
            await noteModel.create({
                title,
                subtitle,
                description,
                file
            })
            res.status(201).json({
                message:"Note created"
            })}
            catch(error){
                console.log(error)
                return next(createHttpError(500,"Error while creating"))
        }
}


const listNotes=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const notes=await noteModel.find()
        res.status(200).json({
            message:"Notes fetched successfully",
            data:notes
        })
    }
    catch(error){
        console.log(error)
        return next(createHttpError(500,"Error while fetching...."))
    }
}
const listNote=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}=req.params
        const note=await noteModel.findById(id)
        if(!note){
            return next(createHttpError(404,"Note not found"))
        }
        res.status(200).json({
            message:"Notes fetched successfully",
            data:note
        })
    }
    catch(error){
        console.log(error)
        return next(createHttpError(500,"Error while fetching...."))
    }
}
const deleteNote=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}=req.params
        const note=await noteModel.findByIdAndDelete(id)
        if(!note){
            return next(createHttpError(404,"Note not found"))
        }
        res.status(200).json({
            message:"Notes deleted successfully"
        })
    }
    catch(error){
        console.log(error)
        return next(createHttpError(500,"Error while fetching...."))
    }
}
export  {createNote, listNotes,listNote,deleteNote}