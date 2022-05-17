import "./App.css";
import { Books } from "../books/books";
import { Lists } from "../lists/lists";
import { Reviews } from "../reviews/reviews";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";

function App() {
  const [lists, setLists] = useState([]);
  const [reviews, setReviews] = useState([]);
  const addList = (name) => {
    const newList = {
      name,
      books: [],
      id: Date.now(),
    };
    setLists([...lists, newList]);
  };
  const addBookToList = (listId, book) => {
    const newLists = [...lists];
    const targetLists = newLists.find((list) => {
      return list.id === listId;
    });

    targetLists.books.push(book);
    console.log(newLists);
    setLists(newLists);
  };

  const addReview = (book, review) => {
    const newBook = {
      ...book,
      review,
    };
    setReviews([...reviews, newBook]);
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Books onAdd={addBookToList} lists={lists} />}
          ></Route>
          <Route
            path="/lists"
            element={
              <Lists onAdd={addList} lists={lists} onAddReview={addReview} />
            }
          />
          <Route path="/reviews" element={<Reviews reviews={reviews} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
