import { Request, Response } from "express";
import { findAllBooks, registerBook, modifyBook,removeBook } from "../services/BookService";
import { IBook } from "../models/Book";
import { IBookModel } from "../daos/BookDao";

export async function getAllBooks(req:Request, res:Response){
    try{
     let books = await findAllBooks()
     res.status(200).json({message:"Retrived all books", count:books.length, books})
    }catch(error:any){
        res.status(500).json({message:"Unable to retrive books at this time", error})

    }
}

export async function createBook(req:Request, res:Response){
    let book =req.body;
    try{
        let savedBook = await registerBook(book)
        res.status(201).json({message:"Book created successfully", savedBook})

    }catch(error){
        res.status(500).json({message:"Unable to create book at this time", error})

    }
}

export async function updateBook(req:Request, res:Response){
    let book = req.body;
    try{
        let updatedBook = await modifyBook(book)
        res.status(202).json({message:"Book updated successfully", updatedBook})

    }catch(error){
        res.status(500).json({message:"Unable to update book at this time", error})

    }
}

export async function deleteBook(req:Request, res:Response){
    let {barcode} = req.params;

    try{
        let message = await removeBook(barcode)
        res.status(202).json({message})

    }catch(error:any){
        res.status(500).json({message:"Unable to delete book at this time", error})

    }
}



