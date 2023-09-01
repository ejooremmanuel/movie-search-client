import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovie } from "./hooks/index.hook";
import { CircularProgress } from "@mui/material";

const ViewSelectedMovie = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovie(id || "");

  if (isLoading) return <CircularProgress />;

  return <div>ViewSelectedMovie</div>;
};

export default ViewSelectedMovie;
