import React from "react";
import "./reviews.css";

import BookList from "../books/bookList";

export function Reviews({ reviews }) {
  return reviews.length ? (
    <BookList books={reviews} />
  ) : (
    <div className="reviews">
      If you would like to add a review, please go to the lists page
    </div>
  );
}

export default Reviews;
