import "./books.css";
import React, { useEffect, useState } from "react";
import { Book } from "./book";

import { createHashHistory } from "history";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  TextField,
  FormControl,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import BookList from "./bookList";

export function Books({ onAdd, lists }) {
  // const [books, setBooks] = useState([{}]);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [currentList, setCurrentList] = useState();

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    console.log("hi");
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
    console.log(parsedBody);
  };

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <div id="title">Books</div>
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

      <div>
        <BookList books={books} lists={lists} onAdd={onAdd} />
      </div>
    </>
  );
}

export default Books;
