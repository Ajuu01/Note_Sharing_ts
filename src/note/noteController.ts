import { NextFunction, Request, Response } from "express"
import noteModel from "./noteModel"
import envConfig from "../config/config"
import createHttpError from "http-errors"
import fs from "fs"
import path from "path"

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file
      ? `${envConfig.backendUrl}/${req.file.filename}`
      : "https://www.freepik.com/photos";

    const { title, subtitle, description } = req.body

    if (!title || !subtitle || !description || title === undefined) {
      res.status(400).json({
        message: "Please provide all fields",
      });
      return
    }

    await noteModel.create({
      title,
      subtitle,
      description,
      file,
    });

    res.status(201).json({
      message: "Note created",
    });
  } catch (error) {
    console.log(error)
    return next(createHttpError(500, "Error while creating"))
  }
};

const listNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await noteModel.find()
    res.status(200).json({
      message: "Notes fetched successfully",
      data: notes,
    })
  } catch (error) {
    console.log(error)
    return next(createHttpError(500, "Error while fetching...."))
  }
}

const listNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);
    if (!note) {
      return next(createHttpError(404, "Note not found"))
    }
    res.status(200).json({
      message: "Notes fetched successfully",
      data: note,
    });
  } catch (error) {
    console.log(error)
    return next(createHttpError(500, "Error while fetching...."))
  }
};

const editNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { title, subtitle, description } = req.body

    const note = await noteModel.findById(id)

    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }

    let updatedFile = note.file

    // if new image uploaded, delete old image
    if (req.file) {
      if (
        note.file &&
        !note.file.includes("freepik.com")
      ) {
        const oldFileName = note.file.split("/").pop();
        if (oldFileName) {
          const oldFilePath = path.join(process.cwd(), "uploads", oldFileName)

          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
      }

      updatedFile = `${envConfig.backendUrl}/${req.file.filename}`
    }

    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      {
        title: title || note.title,
        subtitle: subtitle || note.subtitle,
        description: description || note.description,
        file: updatedFile,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while updating note"));
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const note = await noteModel.findById(id);

    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }

    // delete image if it's uploaded image
    if (
      note.file &&
      !note.file.includes("freepik.com")
    ) {
      const fileName = note.file.split("/").pop();

      if (fileName) {
        const filePath = path.join(process.cwd(), "uploads", fileName);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
    }

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
      message: "Notes deleted successfully",
    });
  } catch (error) {
    console.log(error)
    return next(createHttpError(500, "Error while fetching...."))
  }
};

export { createNote, listNotes, listNote, editNote, deleteNote }