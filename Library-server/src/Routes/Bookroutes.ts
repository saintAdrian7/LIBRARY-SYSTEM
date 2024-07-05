import express from 'express'
import {getAllBooks, createBook, deleteBook, updateBook}from '../controllers/BookController'

const router = express.Router()

router.get('/', getAllBooks)

router.post('/', createBook)

router.put('/', updateBook)

router.delete('/:barcode', deleteBook)

export default router