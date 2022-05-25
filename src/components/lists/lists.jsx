import React, { useState } from "react";
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

export function Lists({ onAdd, lists, onAddReview, onRemoveBook }) {
  const [listName, setListName] = useState("");
  const [currentList, setCurrentList] = useState();

  function addList(event) {
    event.preventDefault();
    onAdd(listName);
    setListName("");
  }
  const handleListName = (event) => {
    setListName(event.target.value);
  };

  return (
    <>
      <div className="lists">
        <form onSubmit={addList}>
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
          {lists.length ? (
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
          ) : (
            <div></div>
          )}
        </form>
      </div>
      <BookList
        books={lists.find((list) => list.id === currentList)?.books || []}
        onAddReview={onAddReview}
        onRemoveBook={(bookId) => onRemoveBook(currentList, bookId)}
      />
    </>
  );
}

export default Lists;
