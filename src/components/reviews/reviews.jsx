import React, { useState, useContext } from "react";
import "./reviews.css";
import { TextField, IconButton } from "@mui/material";
import BookList from "../books/bookList";

export function Reviews({ reviews }) {
  return <BookList books={reviews} />;
}

export default Reviews;
