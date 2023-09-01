import React, { FC } from "react";
import { MovieResponse } from "../views/types/index.types";
import { Box } from "@mui/material";

type Props = {
  movie: MovieResponse;
};

const MovieCard: FC<Props> = ({ movie }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url('${movie.Poster}')`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "200px",
        backgroundSize: "cover",
        // backgroundPosition: "center",
        aspectRatio: "1/3",
      }}
    >
      <Box
        display="flex"
        sx={{
          backgroundColor: "rgba(0,0,0,0)",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          "&:hover > .info": {
            display: "flex",
            transition: "all .2s",
          },
          "&:hover": {
            backgroundColor: "rgba(0,0,0,.8)",
            display: "flex",
            transition: "all .2s",
          },
        }}
      >
        <div className="info hidden text-white p-4 box-border flex-col gap-2">
          <div className="text-lg">{movie.Title}</div>
          <div className="text-sm">
            {movie.Year} | {movie.Type}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default MovieCard;
