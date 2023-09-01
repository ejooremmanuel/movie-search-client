import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useGetMovies } from "./hooks/index.hook";
import { MovieCard } from "../components";

type Props = {};

const Search = (props: Props) => {
  const [query, setQuery] = useState<string>("");

  const [page, setPage] = useState(1);

  const { data, isLoading, search, loading } = useGetMovies();

  //   const optimizedSearch = useMemo(() => {
  //     return debounce(setQuery, 500);
  //   }, []);

  return (
    <Box className="container h-full">
      <Box mx="auto" className="lg:w-[65%] flex gap-2">
        <TextField
          fullWidth
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Titles, year"
          sx={{
            border: "1px solid #fff",
            color: "#fff",
            borderRadius: "5px",
            backgroundColor: "inherit",
            fontSize: "20px",

            "& .css-1g24dm6-MuiInputBase-input-MuiOutlinedInput-input": {
              color: "#fff",
              fontSize: "20px",
              backgroundColor: "inherit",
            },
          }}
        />
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => {
            if (!query.trim()) return;
            search({
              q: query,
              page,
            });
          }}
          variant="outlined"
          color="primary"
          size="large"
          endIcon={loading && <CircularProgress size={20} />}
        >
          Search
        </Button>
      </Box>
      <Box className="mt-[30px]">
        <Box className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
          {isLoading &&
            !data?.Search?.length &&
            ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"].map((it) => (
              <Skeleton height="250px"></Skeleton>
            ))}
          {data?.Search?.map((movie, index) => (
            <MovieCard key={movie?.imdbID} movie={movie} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
