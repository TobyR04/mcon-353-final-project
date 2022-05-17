import { Book } from "./book";
import { Grid } from "@mui/material";

export function BookList({ books, lists, onAdd, onAddReview }) {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {books.map((book) => {
        return (
          <Book
            book={book}
            lists={lists}
            onAdd={onAdd}
            onAddReview={onAddReview}
          />
        );
      })}
    </Grid>
  );
}

export default BookList;
