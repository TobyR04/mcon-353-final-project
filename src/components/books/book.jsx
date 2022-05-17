import React, { useState } from "react";
import {
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Card,
  Grid,
} from "@mui/material";

export function Book({
  book,
  lists = [],
  onAdd = () => {},
  onAddReview = () => {},
}) {
  const [currentList, setCurrentList] = useState(lists[0]?.id);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "35vw",
        }}
      >
        <div key={book.id}>
          <h1>
            <a href={book.link}>{book.title}</a>
          </h1>
          <img src={book.img} />{" "}
          {!!lists.length && (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Add to List
              </InputLabel>

              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="list"
                value={currentList}
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
              <Button
                onClick={() => {
                  onAdd(currentList, book);
                }}
              >
                Add To List
              </Button>
            </FormControl>
          )}
          <Button
            onClick={() => {
              onAddReview(book, prompt("Please write your review."));
            }}
          >
            Add Review
          </Button>
          <p>{book.authors} </p>
          <p>{book.review}</p>
        </div>
      </Card>
    </Grid>
  );
}
export default Book;
