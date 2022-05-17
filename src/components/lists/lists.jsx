import React, { useState, useContext, Fragment } from "react";
import "./lists.css";
import {
  TextField,
  FormControl,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BookList from "../books/bookList";

export function Lists({ onAdd, lists, onAddReview }) {
  const [listName, setListName] = useState("");
  const [currentList, setCurrentList] = useState();

  function addList(event) {
    event.preventDefault();
    onAdd(listName);
  }
  const handleListName = (event) => {
    setListName(event.target.value);
  };

  return (
    <>
      <form onSubmit={addList}>
        <div>Lists</div>
        <TextField
          id="filled-basic"
          onChange={handleListName}
          value={listName}
          placeholder="Add List"
        />

        <IconButton aria-label="send" onClick={addList}>
          {" "}
          <AddIcon id="submit" type="submit"></AddIcon>
        </IconButton>
        <div>
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
        </div>
      </form>

      <BookList
        books={lists.find((list) => list.id === currentList)?.books || []}
        onAddReview={onAddReview}
      />
    </>
  );
}

export default Lists;
