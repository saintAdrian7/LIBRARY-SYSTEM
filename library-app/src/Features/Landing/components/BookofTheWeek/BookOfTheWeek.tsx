import React from "react";
import './BookOfTheWeek.css'
import { BookInformation } from "../../../Book";

export const BookOfTheWeek:React.FC = () =>{
    return(
        <div className="book-of-the-week">
            <h1>Book of the Week:</h1>
            <BookInformation book={
                {   _id: "66869d24810705d2dbd34c2e",
                    barcode: "1234567890123",
                    cover: "https://picsum.photos/id/237/200/300",
                    title: "The Great Gatsby",
                    authors: ["F. Scott Fitzgerald"],
                    description: "A novel set in the Roaring Twenties about Jay Gatsby's unrequited love for Daisy Buchanan.",
                    subjects: ["Classic", "American Literature", "Novel"],
                    publicationDate: new Date("1925-04-10"),
                    publisher: "Charles Scribner's Sons",
                    pages:200,
                    genre: "Fiction",
                    records:[]
                }

            } />
        </div>
    )
}