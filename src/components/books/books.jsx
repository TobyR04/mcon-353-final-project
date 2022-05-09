import "./books.css";
import React, { useEffect, useState } from "react";
import { useInterval } from "./useInterval";
import { createHashHistory } from "history";
import SearchIcon from "@mui/icons-material/Search";
import {
  Paper,
  Container,
  Grid,
  Box,
  TextField,
  FormControl,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

export function Books({ onAdd, lists }) {
  // const [books, setBooks] = useState([{}]);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [currentList, setCurrentList] = useState();

  // // constructor(props){
  // //   super(props);
  // //   this.state = {
  // //     books:[],
  // //     searchField: ''
  // //   }
  // // }
  // // const newBook = {
  // //   searchField: "",
  // //   books: [],
  // // };

  // // handleSearch = (e) => {
  // //   this.setState({ searchField: e.target.value });
  // // };
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
  // useInterval(() => {
  //   fetch(`ttps://www.googleapis.com/books/v1/volumes?`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBooks(data.Items);
  //     });
  // }, 1000);
  // searchBook = (e) => {
  //   e.preventDefault();
  //   //useInterval(() => {
  //   request
  //     .get(`https://www.googleapis.com/books/v1/volumes?`)
  //     .query({ q: this.search })
  //     .then((data) => {
  //       createHashHistory.setState({ books: [...data.body.items] }); //need the books array

  //       //setBooks(data.Items);
  //     });
  //   //}, 1000);
  //};
  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Pick List
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="list"
          onChange={(e) => {
            setCurrentList(e.target.value);
          }}
        >
          {lists.map((list) => (
            <MenuItem key={list.id} value={list.id}>
              {list.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <form onSubmit={handleSearchSubmit}>
        <div>Books</div>
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
        {books.map((book) => {
          return (
            <div key={book.id}>
              <h1>
                <a href={book.link}>{book.title}</a>
              </h1>

              <img
                src={book.img}
                onClick={() => {
                  onAdd(currentList, book);
                }}
              />
              <p>{book.authors} </p>
            </div>
          );
        })}
      </div>
    </>
  );
  {
    /* //   <div className="form">
  //     <header> Books</header>
  //     <div className="search">
  //       <form onSubmit={searchBook} action="">
  //         <input onChange={handleSearch} type="text" />
  //         <button type="submit">Search</button>
  //       </form>
  //     </div>
  //     books.map((book,i) => { */
  }
  //       image = {book.volumeInfo.imageLinks.thumbnail}
  //       title={book.volumeInfo.title}
  //     author={book.volumeInfo.authors }
  //     published={book.volumeInfo.publishedDate}
  //     })
  //   </div>
  //);
}

export default Books;
