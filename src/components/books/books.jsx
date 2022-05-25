import "./books.css";
import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { TextField, IconButton } from "@mui/material";
import BookList from "./bookList";

export function Books({ onAdd, lists }) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" + search
    );
    const responseBody = await response.json();
    const parsedBody = responseBody.items.map((item) => {
      return {
        title: item.volumeInfo.title,
        link: item.volumeInfo.previewLink,
        authors: item.volumeInfo.authors?.join(", "),
        img: item.volumeInfo.imageLinks?.thumbnail,
        id: item.id,
      };
    });
    setBooks(parsedBody);
    setSearch("");
    console.log(parsedBody);
  };

  return (
    <>
      <div className="books">
        <form onSubmit={handleSearchSubmit}>
          <TextField
            id="filled-basic"
            onChange={handleSearch}
            value={search}
            placeholder="Search Book"
          />

          <IconButton type="submit">
            {" "}
            <SearchIcon id="submit" type="submit"></SearchIcon>
          </IconButton>
        </form>
      </div>
      <div>
        <BookList books={books} lists={lists} onAdd={onAdd} />
      </div>
    </>
  );
}

export default Books;
