import React, { useState } from "react";
import {
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Card,
  Grid,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export function Book({
  book,
  lists = [],
  onAdd = () => {},
  onAddReview,
  onRemoveBook,
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
          <h1
            style={{
              fontSize: "20px",
              height: "6rem",
            }}
          >
            {onRemoveBook && (
              <IconButton>
                <ClearIcon onClick={onRemoveBook}></ClearIcon>
              </IconButton>
            )}
            <a target="_blank" href={book.link}>
              {book.title || "title not found"}
            </a>
          </h1>
          <img
            style={{ height: "200px", width: "150px" }}
            src={book.img || "https://picsum.photos/150/200"}
          />
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
          {onAddReview && (
            <Button
              onClick={() => {
                onAddReview(book, prompt("Please write your review."));
              }}
            >
              Add Review
            </Button>
          )}
          <p style={{ fontWeight: "bold" }}>
            {book.authors || "authors not found"}{" "}
          </p>
          {book.review && (
            <p
              style={{
                border: "2px solid rgba(0, 0, 0, 0.05)",
                textAlign: "center",
              }}
            >
              {book.review}
            </p>
          )}
        </div>
      </Card>
    </Grid>
  );
}
export default Book;
