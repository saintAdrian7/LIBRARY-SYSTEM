import Book,{IBookModel} from "../daos/BookDao";
import { IBook } from "../models/Book";


export async function findAllBooks():Promise<IBookModel[]> {
    return await Book.find();
}


export async function modifyBook(book:IBookModel):Promise<IBookModel> {
    try{
        let id = await Book.findOneAndUpdate({barcode: book.barcode},book, {new:true});
        if(id) return book;

        throw new Error('Item does not exist')

    }catch(error:any){
     throw error
    }
}

export async function registerBook(book:IBook):Promise<IBookModel> {
    const savedBook = new Book(book)
    return await savedBook.save();
}

export async function removeBook(barcode:string):Promise<String>{
    try{
    let id = await Book.findOneAndDelete({barcode});
    if(id) return 'Succesfully deleted book';
    throw new Error('Item does not exist')
    }catch(error:any){
    throw error
    }
    
}